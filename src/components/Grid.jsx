import { FaRegHeart } from "react-icons/fa";
import "./Grid.css";
import { useEffect, useState } from "react";
import Rete4 from "../loghi/mediaset-logo/Rete4.svg";
import Canale5 from "../loghi/mediaset-logo/Canale5.svg";
import Italia1 from "../loghi/mediaset-logo/Italia1.svg";
import Italia2 from "../loghi/mediaset-logo/Italia2.svg";
import twentyseven from "../loghi/mediaset-logo/27.svg";
import Boing from "../loghi/mediaset-logo/Boing.svg";
import Cartoonito from "../loghi/mediaset-logo/Cartoonito.svg";
import Cine34 from "../loghi/mediaset-logo/Cine34.svg";
import Focus from "../loghi/mediaset-logo/Focus.svg";
import Iris from "../loghi/mediaset-logo/Iris.svg";
import La5 from "../loghi/mediaset-logo/La5.svg";
import MediasetExtra from "../loghi/mediaset-logo/Mediaset_Extra.svg";
import Mediaset20 from "../loghi/mediaset-logo/Mediaset20.svg";
import TGcom24 from "../loghi/mediaset-logo/TGcom24.svg";
import TopCrime from "../loghi/mediaset-logo/Top_Crime.svg";

import Rai1 from "../loghi/rai-logo/Rai1.svg";
import Rai2 from "../loghi/rai-logo/Rai2.svg";
import Rai3 from "../loghi/rai-logo/Rai3.svg";
import Rai4 from "../loghi/rai-logo/Rai4.svg";
import Rai5 from "../loghi/rai-logo/Rai5.svg";
import RaiYoyo from "../loghi/rai-logo/RaiYoyo.svg";
import RaiMovie from "../loghi/rai-logo/RaiMovie.svg";
import RaiPremium from "../loghi/rai-logo/RaiPremium.svg";
import RaiGulp from "../loghi/rai-logo/RaiGulp.svg";
import RaiNews24 from "../loghi/rai-logo/RaiNews24.svg";

const ChannelMediasetLogoMap = {
  R4: Rete4, // Rete4
  C5: Canale5, // Canale5
  I1: Italia1, // Italia1
  LB: Mediaset20, // 20
  KI: Iris, // Iris
  TS: twentyseven, // 27
  KA: La5, // La5
  B6: Cine34, // Cine34
  FU: Focus, // Focus
  LT: TopCrime, // TopCrime
  I2: Italia2, // Italia2
  KF: TGcom24, // Tgcom24
  KQ: MediasetExtra, // MediasetExtra
  KB: Boing, // Boing
  LA: Cartoonito, // Cartoonito
};

const ChannelRaiLogoMap = {
  "rai-1": Rai1, // Rai 1
  "rai-2": Rai2, // Rai 2
  "rai-3": Rai3, // Rai 3
  "rai-4": Rai4, // Rai 4
  "rai-5": Rai5, // Rai 5
  "rai-yoyo": RaiYoyo, // Rai Yoyo
  "rai-movie": RaiMovie, // Rai Movie
  "rai-premium": RaiPremium, // Rai Premium
  "rai-gulp": RaiGulp, // Rai Gulp
  "rai-news-24": RaiNews24, // Rai News 24
};

function getCustomStyle(duration) {
  let width = (duration * 1004) / 120;
  let height = 70;
  return {
    width: `${width}px`,
    height: `${height}px`,
  };
}

function Grid(props) {
  const [intervals, setIntervals] = useState([]);
  const [channelsWithShows, setChannelsWithShows] = useState([]);
  const [currentShow, setCurrentShow] = useState({
    title: "",
    start_time: new Date(),
    end_time: new Date(),
    description: "",
  });

  useEffect(() => {
    /* ******************** POPULATE INTERVALS ******************** */
    const now = new Date(); // Current date and time
    const currentHour = now.getHours(); // 0-23
    let intervals = [];
    for (let i = currentHour; i < currentHour + 24; i++) {
      intervals.push(`${i % 24 < 10 ? "0" + (i % 24) : i % 24}:00`);
      intervals.push(`${i % 24 < 10 ? "0" + (i % 24) : i % 24}:30`);
    }
    intervals.shift();
    //console.log("Intervals", intervals);
    setIntervals(intervals);
    /* ******************** POPULATE CHANNELS ******************** */
    fetch("http://localhost:3010/api/tv-program/today")
      .then((response) => response.json())
      .then((data) => {
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
            channel: data.data.find((item) => item.channel_id === channel_id)
              .channel,
          };
        });
        //console.log("Channels", channels);
        /* ******************** POPULATE SHOWS ******************** */
        // For each channel then get the shows in data and populate the shows
        // TODO: O usiamo una API che mi dia i canali e poi siamo sicuri che i programmi ci siano per tutti, o dobbiamo fare un check
        let shows = [];
        channels.forEach((channel) => {
          let nowtime = new Date().getTime();
          let showsForChannel = data.data.filter(
            (item) =>
              item.channel_id === channel.channel_id &&
              new Date(item.end_time).getTime() > nowtime
          );
          showsForChannel = showsForChannel.map((item) => {
            return {
              title: item.title,
              start_time: item.start_time,
              end_time: item.end_time,
              description: item.description,
            };
          });
          // Order shows by start_time
          showsForChannel.sort((a, b) => {
            return new Date(a.start_time) - new Date(b.start_time);
          });
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
              duration: duration,
            };
          });
          shows.push({
            channel_id: channel.channel_id,
            shows: showsForChannel,
          });
        });
        setChannelsWithShows(shows);
        //console.log("Shows", shows);
      });
  }, []);

  function handleChannelClick(e) {
    e.preventDefault();
    //.log('Channel clicked');
    if (e.target.getAttribute("data-click-state") == 1) {
      e.target.setAttribute("data-click-state", 0);
      e.target.style.fontVariationSettings =
        "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48";
    } else {
      e.target.setAttribute("data-click-state", 1);
      e.target.style.fontVariationSettings =
        "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48";
    }
  }

  // * Mediaset
  let MediasetIDs = Object.keys(ChannelMediasetLogoMap);
  let channelsMediaset = channelsWithShows.filter((channel) =>
    MediasetIDs.includes(channel.channel_id)
  );
  channelsMediaset.sort((a, b) => {
    return (
      Object.keys(ChannelMediasetLogoMap).indexOf(a.channel_id) -
      Object.keys(ChannelMediasetLogoMap).indexOf(b.channel_id)
    );
  });
  // * Rai
  let RaiIDs = Object.keys(ChannelRaiLogoMap);
  let channelsRai = channelsWithShows.filter((channel) =>
    RaiIDs.includes(channel.channel_id)
  );
  channelsRai.sort((a, b) => {
    return (
      Object.keys(ChannelRaiLogoMap).indexOf(a.channel_id) -
      Object.keys(ChannelRaiLogoMap).indexOf(b.channel_id)
    );
  });
  // * All
  let sorting = [
    "rai-1",
    "rai-2",
    "rai-3",
    "R4",
    "C5",
    "I1",
    "LB",
    "KI",
    "TS",
    "KA",
    "B6",
    "FU",
    "LT",
    "I2",
    "KF",
    "KQ",
    "rai-3",
    "rai-4",
    "rai-5",
    "rai-movie",
    "rai-premium",
    "rai-news-24",
    "KB",
    "rai-gulp",
    "rai-yoyo",
    "LA",
  ];
  let allChannels = channelsWithShows;
  channelsWithShows.sort((a, b) => {
    return sorting.indexOf(a.channel_id) - sorting.indexOf(b.channel_id);
  });
  let channelsToShow;
  if (props.ch === "mediaset") {
    channelsToShow = channelsMediaset;
  } else if (props.ch === "rai") {
    channelsToShow = channelsRai;
  } else {
    channelsToShow = channelsWithShows;
  }

  return (
    <>
      <div id="guide">
        <div className="row timeline">
          <div className="time-cell channel-top"></div>
          <div className="time-cell bg-red-600">
            <span id="">On now</span>
          </div>
          {intervals.map((interval, index) => (
            <div key={index} className="time-cell bg-neutral">
              <span>{interval}</span>
            </div>
          ))}
        </div>
        {channelsToShow.map((channel, index) => (
          <div className="row">
            <div key={index} className="channel-cell channel">
              <img
                src={
                  ChannelMediasetLogoMap[channel.channel_id] ||
                  ChannelRaiLogoMap[channel.channel_id]
                }
                alt={channel.channel_id}
                width="60px"
              />
            </div>
            {channel.shows.map((show, index) => {
              let starttime = new Date(show.start_time).getTime();
              let endtime = new Date(show.end_time).getTime();
              let nowtime = new Date().getTime();
              if (starttime <= nowtime && endtime >= nowtime) {
                return (
                  <div
                    key={index}
                    className="cell bg-red-600 text-white hover:bg-accent"
                    style={getCustomStyle(show.duration)}
                    onClick={() => {
                      setCurrentShow({
                        title: show.title,
                        start_time: new Date(show.start_time),
                        end_time: new Date(show.end_time),
                        description: show.description,
                      });
                      document.getElementById("show_more_modal").showModal();
                    }}
                  >
                    <span>{show.title}</span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="cell bg-neutral text-white hover:bg-accent"
                    style={getCustomStyle(show.duration)}
                    onClick={() => {
                      setCurrentShow({
                        title: show.title,
                        start_time: new Date(show.start_time),
                        end_time: new Date(show.end_time),
                        description: show.description,
                      });
                      document.getElementById("show_more_modal").showModal();
                    }}
                  >
                    <span>{show.title}</span>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
      <dialog id="show_more_modal" className="modal left-0 z-50">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{currentShow.title}</h3>
          <p className="py-4">{currentShow.description}</p>
        </div>
      </dialog>
    </>
  );
}

export default Grid;
