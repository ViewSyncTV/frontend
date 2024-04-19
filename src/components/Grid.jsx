import { FaRegHeart } from "react-icons/fa";
import './Grid.css';
import { useEffect, useState } from "react";
import Rete4 from "../mediaset-logo/Rete4.svg";
import Canale5 from "../mediaset-logo/Canale5.svg";
import Italia1 from "../mediaset-logo/Italia1.svg";
import Italia2 from "../mediaset-logo/Italia2.svg";
import twentyseven from "../mediaset-logo/27.svg";
import Boing from "../mediaset-logo/Boing.svg";
import Cartoonito from "../mediaset-logo/Cartoonito.svg";
import Cine34 from "../mediaset-logo/Cine34.svg";
import Focus from "../mediaset-logo/Focus.svg";
import Iris from "../mediaset-logo/Iris.svg";
import La5 from "../mediaset-logo/La5.svg";
import MediasetExtra from "../mediaset-logo/Mediaset_Extra.svg";
import Mediaset20 from "../mediaset-logo/Mediaset20.svg";
import TGcom24 from "../mediaset-logo/TGcom24.svg";
import TopCrime from "../mediaset-logo/Top_Crime.svg";

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
          <span id="">On now</span>
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
              <div className="ch_number">
                
                <span id="ch_number">{channel.channel_id}</span>
              </div>
              <a href="#" className="ch_logo">
                <img
                  src={Canale5}
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
          <div className="ch_number">
            
            <span id="ch_number">4</span>
          </div>
          
          <img
              src={Rete4}
              alt= "Rete4"
              width="60px"
            />
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
          <div className="ch_number">
            
            <span id="ch_number">5</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Canale5}
              alt="Canale5"
              width="60px"
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
          <div className="ch_number" >
            <span id="ch_number">6</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Italia1}
              alt= "Italia1"
              width="60px"
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
          <div className="ch_number">
            <span id="ch_number">106</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Italia2}
              alt= "Italia2"
              width="60px"
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
          <div className="ch_number" >
            <span id="ch_number">113</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={twentyseven}
              alt= "27"
              width="60px"
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
          <div className="ch_number">
            
            <span id="ch_number">119</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Boing}
              alt= "Boing"
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
          <div className="ch_number">
            
            <span id="ch_number">120</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Cartoonito}
              alt= "Cartoonito"
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
          <div className="ch_number">
            
            <span id="ch_number">123</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Cine34}
              alt= "Cine34"
              width="60px"
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
          <div className="ch_number">
            
            <span id="ch_number">124</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Focus}
              alt= "Focus"
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
          <div className="ch_number">
            
            <span id="ch_number">125</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Iris}
              alt= "Iris"
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
          <div className="ch_number">
            
            <span id="ch_number">127</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={La5}
              alt= "La5"
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
          <div className="ch_number">
            
            <span id="ch_number">128</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={MediasetExtra}
              alt= "MediasetExtra"
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
          <div className="ch_number">
            
            <span id="ch_number">129</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={Mediaset20}
              alt= "Mediaset20"
              width="60px"
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
          <div className="ch_number">
            
            <span id="ch_number">131</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={TGcom24}
              alt= "TGcom24"
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
          <div className="ch_number">
            
            <span id="ch_number">134</span>
          </div>

          <a href="#" className="ch_logo">
            <img
              src={TopCrime}
              alt= "TopCrime"
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
    </div>
  );
}

export default Grid;
