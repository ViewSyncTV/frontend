import { FaRegHeart } from "react-icons/fa";
import './Grid.css';
import { useEffect, useState } from "react";


function getCustomStyle(duration) {
  let width = (duration * 1004) / 120;
  let height = 70;
  return {
    width: `${width}px`,
    height: `${height}px`
  }
}

function Grid() {
  const [intervals, setIntervals] = useState([]);
  const [channelsWithShows, setChannelsWithShows] = useState([]);

  useEffect(() => {
    /* ******************** POPULATE INTERVALS ******************** */
    const now = new Date(); // Current date and time
    const currentHour = now.getHours(); // 0-23
    let intervals = [];
    for (let i = currentHour; i < currentHour + 24; i++) {
      intervals.push(`${(i % 24) < 10 ? '0' + (i % 24) : (i % 24)}:00`);
      intervals.push(`${(i % 24) < 10 ? '0' + (i % 24) : (i % 24)}:30`);
    }
    intervals.shift();
    console.log("Intervals", intervals);
    setIntervals(intervals);
    /* ******************** POPULATE CHANNELS ******************** */
    fetch('http://localhost:3010/api/tv-program/today')
      .then(response => response.json())
      .then(data => {
        console.log("Channels", data);
        /*
          {
            "data": [
              {
                channel: "Canale5" // String | to be displayed
                channel_id: "C5" // String | unique
                description: String,
                end_time: String (Date),
                id: number,
                start_time: String (Date),
                title: String,
              }, 
              {...}, ...
            ]
          }
        */
        // In data we have everything, channels are not present only once...
        let channel_ids = data.data.map((item) => item.channel_id);
        channel_ids = [...new Set(channel_ids)];
        let channels = channel_ids.map((channel_id) => {
          return {
            channel_id: channel_id,
            channel: data.data.find((item) => item.channel_id === channel_id).channel
          }
        });
        console.log("Channels", channels);
        /* ******************** POPULATE SHOWS ******************** */
        // For each channel then get the shows in data and populate the shows
        // TODO: O usiamo una API che mi dia i canali e poi siamo sicuri che i programmi ci siano per tutti, o dobbiamo fare un check
        let shows = [];
        channels.forEach((channel) => {
          let showsForChannel = data.data.filter((item) => item.channel_id === channel.channel_id);
          showsForChannel = showsForChannel.map((item) => {
            return {
              title: item.title,
              start_time: item.start_time,
              end_time: item.end_time,
              description: item.description
            }
          });
          // Order shows by start_time
          showsForChannel.sort((a, b) => { return new Date(a.start_time) - new Date(b.start_time); });
          // Set a duration in minutes for each show
          showsForChannel = showsForChannel.map((show, index) => {
            let start_time = new Date(show.start_time);
            let end_time = new Date(show.end_time);
            let duration = (end_time - start_time) / 60000;
            return {
              title: show.title,
              start_time: show.start_time,
              end_time: show.end_time,
              description: show.description,
              duration: duration
            }
          });
          shows.push({
            channel_id: channel.channel_id,
            shows: showsForChannel
          });
        });
        setChannelsWithShows(shows);
        console.log("Shows", shows);
      });
  }, []);

  function handleChannelClick(e) {
    e.preventDefault();
    console.log('Channel clicked');
    if (e.target.getAttribute('data-click-state') == 1) {
      e.target.setAttribute('data-click-state', 0);
      e.target.style.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48";
    } else {
      e.target.setAttribute('data-click-state', 1);
      e.target.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48";
    }
  }
  return (
    <div id="guide">
      <div className="row timeline">
        <div className="time-cell channel-top"></div>
        <div className="time-cell">
          <span id="on-now">On now</span>
          <div className="arrow-down"></div>
        </div>
        {intervals.map((interval, index) => (
          <div key={index} className="time-cell">
            <span>{interval}</span>
          </div>
        ))}
      </div>

        {channelsWithShows.map((channel, index) => (
          <div className="row">
            <div key={index} className="channel-cell channel">
              <div className="ch_number" onClick={handleChannelClick}>
                <span><FaRegHeart /></span>
                <span id="ch_number">{channel.channel_id}</span>
              </div>
              <a href="#" className="ch_logo">
                <img
                  src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s71733_ld_h15_aa.png?w=80"
                  width="76px"
                />
              </a>
            </div>
            {channel.shows.map((show, index) => (
              <div key={index} className="cell" style={getCustomStyle(show.duration)}>
                <span>{show.title}</span>
              </div>
            ))}
          </div>
        ))}

      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">100</span>
          </div>
          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s71733_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>

        <div className="cell time-30 on-now">
          <span>Christmas Reservations</span>
        </div>
        <div className="cell time-30 on-next">
          <span>CBC Edmonton News</span>
        </div>
        <div className="cell time-15 on-next">
          <span>CBC Edmonton News</span>
        </div>
        <div className="cell time-30 on-next">
          <span>The Holiday</span>
        </div>
        <div className="cell time-15 on-next">
          <span>The National</span>
        </div>
        <div className="cell time-30 on-next">
          <span>CBC Edmonton News</span>
        </div>
        <div className="cell time-60 on-next">
          <span>CBC Edmonton News</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">101</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/b5bfe23a-1d07-4abb-9dfc-3ab6bdfdac0f.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-60 on-now">
          <span>A Kinderhearted Christmas</span>
        </div>
        <div className="cell time-30 on-next">
          <span>The Big Bang Theory</span>
        </div>
        <div className="cell time-30 on-next">
          <span>A Kinderhearted Christmas</span>
        </div>
        <div className="cell time-15 on-next">
          <span>E Talk</span>
        </div>
        <div className="cell time-60 on-next">
          <span>A Kinderhearted Christmas</span>
        </div>
        <div className="cell time-15 on-next">
          <span>A Kinderhearted Christmas</span>
        </div>
        <div className="cell time-30 on-next">
          <span>A Kinderhearted Christmas</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">102</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/369244a3-2578-43c4-9963-775df6df1f48.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-15 on-now">
          <span>Alberta Primetime</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Cash Cab</span>
        </div>
        <div className="cell time-60 on-next">
          <span>The Big Bang Theory</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Cash Cab</span>
        </div>
        <div className="cell time-15 on-next">
          <span>The Big Bang Theory</span>
        </div>
        <div className="cell time-30 on-next">
          <span>The Big Bang Theory</span>
        </div>
        <div className="cell time-60 on-next">
          <span>The Big Bang Theory</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">104</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s63641_ld_h15_ab.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-60 on-now">
          <span>Global News Hour at 6</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div className="cell time-60 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Global News Hour at 6</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">106</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s68327_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-30 on-now">
          <span>City News at 6 Edmonton</span>
        </div>
        <div className="cell time-30 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div className="cell time-15 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div className="cell time-30 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div className="cell time-15 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div className="cell time-15 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div className="cell time-60 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">113</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s124895_ld_h9_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-60 on-now">
          <span>Inuit TV Programming</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div className="cell time-60 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Inuit TV Programming</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">119</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s72805_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-15 on-now">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div className="cell time-30 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div className="cell time-15 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div className="cell time-60 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div className="cell time-60 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div className="cell time-30 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div className="cell time-15 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">120</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s105304_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-30 on-now">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div className="cell time-60 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div className="cell time-15 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div className="cell time-60 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div className="cell time-15 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div className="cell time-15 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div className="cell time-15 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">123</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s27503_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-60 on-now">
          <span>People Who Sing Together</span>
        </div>
        <div className="cell time-30 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div className="cell time-30 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div className="cell time-15 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div className="cell time-30 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div className="cell time-15 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div className="cell time-60 on-next">
          <span>People Who Sing Together</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">124</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s72855_ld_h15_ab.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-60 on-now">
          <span>Hawaii Five-0</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Hawaii Five-0</span>
        </div>
        <div className="cell time-30 on-next">
          <span>CBN NewsWatch</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Hawaii Five-0</span>
        </div>
        <div className="cell time-60 on-next">
          <span>Hawaii Five-0</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Hawaii Five-0</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Hawaii Five-0</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">125</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s61998_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-15 on-now">
          <span>Despicable Me 2</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div className="cell time-60 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Despicable Me 2</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">127</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s72183_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-30 on-now">
          <span>The Regional</span>
        </div>
        <div className="cell time-15 on-next">
          <span>The Regional</span>
        </div>
        <div className="cell time-60 on-next">
          <span>The Regional</span>
        </div>
        <div className="cell time-15 on-next">
          <span>The Regional</span>
        </div>
        <div className="cell time-15 on-next">
          <span>The Regional</span>
        </div>
        <div className="cell time-30 on-next">
          <span>The Regional</span>
        </div>
        <div className="cell time-30 on-next">
          <span>The Regional</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">128</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s72183_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-15 on-now">
          <span>The Regional</span>
        </div>
        <div className="cell time-30 on-next">
          <span>BC Today</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Hot and Cold</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Hot and Cold</span>
        </div>
        <div className="cell time-30 on-next">
          <span>Hot and Cold</span>
        </div>
        <div className="cell time-15 on-next">
          <span>Hot and Cold</span>
        </div>
        <div className="cell time-60 on-next">
          <span>Friday</span>
        </div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">129</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s90941_ld_h15_ab.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-30 on-now"></div>
        <div className="cell time-30 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-30 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-60 on-next"></div>
        <div className="cell time-30 on-next"></div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">131</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/3af64afe-3b4f-42ad-911a-c69e778defe2.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-30 on-now"></div>
        <div className="cell time-30 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-60 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-60 on-next"></div>
        <div className="cell time-30 on-next"></div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">134</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/f6b29930-3526-4416-9ac6-37efaed877d3.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-60 on-now"></div>
        <div className="cell time-30 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-60 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-30 on-next"></div>
      </div>
      <div className="row">
        <div className="channel-cell channel">
          <div className="ch_number" onClick={handleChannelClick}>
            <span><FaRegHeart /></span>
            <span id="ch_number">135</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/18e4a4fa-bab5-4706-8f7c-5bdc71c8b2d6.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div className="cell time-15 on-now"></div>
        <div className="cell time-30 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-30 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-15 on-next"></div>
        <div className="cell time-30 on-next"></div>
      </div>
    </div>
  );
}

export default Grid;
