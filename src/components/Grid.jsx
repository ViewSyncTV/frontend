import "./Grid.css";
import { useEffect, useState } from "react";
import { HeartIcon as SolidHeartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import { VITE_DEVELOPMENT_MODE, VITE_DEVELOPMENT_URL, VITE_PRODUCTION_URL } from "../constants";
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
import RaiRadio2 from "../loghi/rai-logo/RaiRadio2.svg";
import RaiSport from "../loghi/rai-logo/RaiSport.svg";
import RaiStoria from "../loghi/rai-logo/RaiStoria.svg";

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
  "rai-storia": RaiStoria, // Rai Storia
  "rai-sport": RaiSport, // Rai Sport
  "rai-radio-2": RaiRadio2, // Rai Radio 2
};

function getCustomStyle(duration) {
  let width = (Math.abs(duration) * 1000) / 120 - 0; // -4 px di margine forse servono??? (pare andare senza)
  // console.log("Received Duration: ", Math.abs(duration), " Calculated Width: ", width);
  let height = 70;
  return {
    width: `${width}px`,
    height: `${height}px`,
    margin: "1px 0px 1px 0px",
    padding: "0px",
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
    category: "",
  });
  /**
   * Array of { movie_id: number | null, tvshow_id: number | null }
   */
  const [favourites, setFavourites] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [updateFavourites, setUpdateFavourites] = useState(0);
  const [updateLiked, setUpdateLiked] = useState(0);
  let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
  console.log(backendUrl)
  useEffect(() => {
    fetch(backendUrl + "/api/tv-program/favorites", {
      method: "GET",
      credentials: "include"
    })
    .then(response => response.json())
    .then(res => {
      console.log("Response Favourites From Server: ", res);
      if (res && res.data) { setFavourites(res.data); }
    })
    .catch(error => { console.error("Error:", error); });
  }, [updateFavourites]);

  useEffect(() => {
    console.log("Entered in toggleLiked() method");
    var postData = null;
    console.log("toggleLiked() Category: ", currentShow.category);
    if(currentShow.category == "TV Show") { postData = { tvshow_id: currentShowDetails.id, title: currentShowDetails.title }; }
    else { postData = { movie_id: currentShowDetails.id, title: currentShowDetails.title }; }
    let currentlyLiked = checkIfLiked(currentShow, currentShowDetails, favourites);
    let correctMethod = currentlyLiked ? "DELETE" : "POST";
    console.log("Now execute: ", correctMethod)
    let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
    fetch(backendUrl+'/api/tv-program/favorite', {
        method: correctMethod,
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(res => { console.log("Response from server for toggleLiked() method: ", res); })
      .catch(error => { console.error("Error:", error); });
  }, [updateLiked]);

  useEffect(() => {
    /* ******************** POPULATE INTERVALS ******************** */
    const now = new Date(); // Current date and time
    const currentHour = now.getHours(); // 0-23
    const currentMinute = now.getMinutes(); // 0-59
    const currentDay = now.getDay()

    let intervals = [];
    for (let i = 0; i < 24; i++) {
      // Alle 14:55 sarà 14:00, 14:30, 15:00, ...
      if (currentHour === i && currentMinute < 30 && currentDay == props.day.getDay() ) { intervals.push("On Now"); }
      else { intervals.push(`${i % 24 < 10 ? "0" + (i % 24) : i % 24}:00`); }
      if (currentHour === i && currentMinute >= 30 && currentDay == props.day.getDay()) { intervals.push("On Now"); }
      else { intervals.push(`${i % 24 < 10 ? "0" + (i % 24) : i % 24}:30`); }
    }
    // intervals.shift(); // Rimuovi 14:00 tenendo da 14:30 in poi (c'è anche l'on now prima)
    // if (now.getMinutes() > 30) { intervals.shift(); } // Se son passate le 14:30 rimuovi anche quello
    // Aggiungi "On Now" all'ora corrente

    //console.log("Intervals", intervals);
    setIntervals(intervals);
    /* ******************** POPULATE CHANNELS ******************** */
    let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
    fetch(backendUrl + "/api/tv-program/week")
      .then((response) => response.json())
      .then((data) => {
        console.log("Returned Data From Week: ", data);
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
        console.log("Day:" + props.day);
        let nowtime = new Date(props.day.getFullYear(), props.day.getMonth(), props.day.getDate()).getTime();
        //let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        //let diff = props.day - new Date().getDate(); // 0 = today, 1 = tomorrow, 2 = day after tomorrow, ...
        //let nowtime = today.getTime() + (diff * 60 * 60 * 24 * 1000); // Today at 00:00 + diff days
        channels = channels.filter((channel) => channel.channel_id !== "raiplay-3");
        channels.forEach((channel) => {
          //console.log(channel)
          let showsForChannel = data.data.filter(
            (item) =>
              item.channel_id === channel.channel_id && (
                new Date(item.end_time).getTime() > nowtime
                 &&
                new Date(item.start_time).getTime() < nowtime + (60 * 60 * 24 * 1000)
              )
          );
          showsForChannel = showsForChannel.map((item) => {
            return {
              title: item.title,
              start_time: item.start_time,
              end_time: item.end_time,
              description: item.description,
              category: item.category,
            };
          });
          // Order shows by start_time
          showsForChannel.sort((a, b) => {
            return new Date(a.start_time) - new Date(b.start_time);
          });
          // Check if each show is consecutive to the previous one, if there are holes, fill them with an empty show
          // If any show has the same start_time as the previous one, it should not be included in the filled array as it is a duplicate to be removed
          let showsForChannelFilled = [];
          let today = new Date(props.day.getFullYear(), props.day.getMonth(), props.day.getDate());
          // let today = new Date(new Date().getFullYear(), new Date().getMonth(), props.day);
          let lastStartTime = today.getTime() - 100;
          let lastEndTime = today;
          showsForChannel.forEach((show) => {
            let start_time = new Date(show.start_time);
            let end_time = new Date(show.end_time);
            if (start_time > lastEndTime) {
              let duration = (start_time - lastEndTime) / 60000; // in minutes
              if (duration > 4) {
                showsForChannelFilled.push({
                  title: "",
                  start_time: lastEndTime,
                  end_time: start_time,
                  description: "",
                  duration: duration,
                  category: "",
                });
              }
            }
            
            if (Math.abs(start_time.getTime() - lastStartTime) > 4) {
              showsForChannelFilled.push(show);
            }
            lastStartTime = start_time.getTime();
            lastEndTime = end_time;
          });
          showsForChannel = showsForChannelFilled;
          // Set a duration in minutes for each show
          showsForChannel = showsForChannel.map((show, index) => {
            let start_time = new Date(show.start_time);
            let end_time = new Date(show.end_time);
            if (start_time.getDate() !== end_time.getDate()) {
              if (props.day.getDate() === start_time.getDate()) {
                end_time = new Date(start_time.getFullYear(), start_time.getMonth(), start_time.getDate(), 23, 59, 59);
              } else {
                start_time = new Date(end_time.getFullYear(), end_time.getMonth(), end_time.getDate(), 0, 0, 0);
              }
            }
            let duration = (end_time - start_time) / 60000; // in minutes
            return {
              title: show.title,
              start_time: show.start_time,
              end_time: show.end_time,
              description: show.description,
              duration: duration,
              category: show.category,
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
  }, [props.day]);
  //const [currentPoster, setCurrentPoster] = useState("");
  const [currentShowDetails, setCurrentShowDetails] = useState({});
  const [loadImage, setLoadImage] = useState(0);
  useEffect(() => {
    console.log("Now updating the current show details since it is a movie");
    let title = currentShow.title;
    let category = currentShow.category; // * TV Show | Movie | Film | Kids | Cartoni
    let cat = category === "TV Show" ? "tv-show" : (category === "Movie" ? "movie" : (category === "Film" ? "movie" : (category === "Kids" ? "tv-show" : (category === "Cartoni" ? "tv-show" : "other"))));
    if (cat === "other") { return; } // Do not load image for other categories
    let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
    fetch(backendUrl + `/api/program-metadata/${cat}/${title.split('-')[0]}`)
      .then((response) => response.json())
      .then((res) => {
        console.log("Returned Details: ", res);
        if (res && res.error) {
          fetch(backendUrl + `/api/program-metadata/tv-show/${title}`)
          .then((response) => response.json())
          .then((res) => {
            console.log("Returned Details: ", res);
            if (res && res.error) { return; }
            setCurrentShowDetails(res.data);
            checkIfLiked(currentShow, res.data, favourites) ? setIsLiked(true) : setIsLiked(false)
          });
          return;
        }
        setCurrentShowDetails(res.data);
        checkIfLiked(currentShow, res.data, favourites) ? setIsLiked(true) : setIsLiked(false)
      })
    }, [loadImage]);

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
    "rai-4",
    "rai-5",
    "rai-movie",
    "rai-premium",
    "rai-news-24",
    "KB",
    "rai-gulp",
    "rai-yoyo",
    "LA",
    "rai-storia",
    "rai-sport",
    "rai-radio-2"
  ];
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
          {intervals.map((interval, index) => {
            if (interval === "On Now") {
              return (
                <div key={index} className="time-cell bg-red-600/75">
                  <span>{interval}</span>
                </div>
              );
            } else {
              return (
              <div key={index} className="time-cell bg-neutral">
                <span>{interval}</span>
              </div>
              );
            }
        }
        )}
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
              return (
                <div className={show.title === "" ? "" : "tooltip tooltip-accent"} data-tip={show.title}>
                  <div
                    key={index}
                    className={
                    (show.title === "" ? "cell-disabled " : "hover:bg-accent/75 cell ") +
                      "cell text-white" +
                      (starttime <= nowtime && endtime >= nowtime
                        ? " bg-red-600/75"
                        : " bg-neutral")
                    }
                    style={getCustomStyle(show.duration)}
                    onClick={() => {
                      // TODO: Load Image Here if it is a Movie
                      // ? Query /api/program-metadata/movie/[title separato da trattini minuscolo]
                      if (show.title === "") { return; } // Do not open modal for empty shows
                      console.log("Opening Show: ", show);
                      setCurrentShow({
                        title: show.title,
                        start_time: new Date(show.start_time),
                        end_time: new Date(show.end_time),
                        description: show.description,
                        category: show.category,
                      });
                      if (show.category === "TV Show" || show.category === "Movie" || show.category === "Film" || show.category === "Kids" || show.category === "Cartoni") {
                        setLoadImage(loadImage + 1);
                      } else { setCurrentShowDetails({}); }
                      console.log("Now setting current show...");
                      console.log("Set current show.");
                      document.getElementById("show_more_modal").showModal();
                      console.log("Opened modal.");
                    }}
                  >
                    <span>{show.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <dialog id="show_more_modal" className="modal z-50">
        <div className="modal-box bg-base-100 image-full card p-0 max-h-[32rem] max-w-[35rem]">
          <figure><img src={currentShowDetails.poster_path} className="w-[36rem] h-[32rem] object-none" /></figure>
          <div className="card-body">
            <div className="card-actions">
              {currentShow.category === "TV Show" || currentShow.category === "Movie" || currentShow.category === "Film" ? (
                <>
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-[5rem] top-2">
                    <BellAlertIcon width="1rem"/>
                  </button>
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-[3rem] top-2" onClick={() => handleLikeClick(currentShow, currentShowDetails, setIsLiked, favourites, updateFavourites, setUpdateFavourites, setUpdateLiked, updateLiked)}>
                    {isLiked ? <SolidHeartIcon width="1rem" /> : <OutlineHeartIcon width="1rem" /> }
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-[3rem] top-2">
                    <BellAlertIcon width="1rem" />
                  </button>
                </>
              )}
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-[1rem] top-2">
                  <XMarkIcon width="1rem" />
                </button>
              </form>
            </div>
            <div className="card-title flex-col flex items-start">
              <h2 className="text-lg mt-6 font-bold flex-none">{currentShow.title}</h2>
              <div className="rating gap-1 flex-1 h-0.5">
                <input type="radio" name="rating-3" className="mask mask-heart w-4 bg-red-400" />
                <input type="radio" name="rating-3" className="mask mask-heart w-4 bg-orange-400" checked />
                <input type="radio" name="rating-3" className="mask mask-heart w-4 bg-yellow-400" />
                <input type="radio" name="rating-3" className="mask mask-heart w-4 bg-lime-400" />
                <input type="radio" name="rating-3" className="mask mask-heart w-4 bg-green-400" />
              </div>
            </div>
            {currentShow.category === "TV Show" || currentShow.category === "Movie" || currentShow.category === "Film" ? (
              <>
                <div className="space-x-2">
                  {currentShowDetails && currentShowDetails.genres && currentShowDetails.genres.map((genre, index) => (
                    <div key={index} className="badge badge-accent">{genre}</div>
                  ))}
                </div>
                <div>
                  <div className="badge badge-primary">{((currentShow.end_time ?? new Date()) - (currentShow.start_time ?? new Date())) / (1000 * 60)} min</div>
                </div>
              </>
            ) : (
              <></>
            )}
            <p className="py-4 mt-4">{currentShow.description}</p>
            <div className="py-4 absolute bottom-1 space-x-2">
              <div className="badge badge-info">{`${new Intl.DateTimeFormat("it-IT", {timeStyle: "short"}).format(currentShow.start_time ?? new Date())} → ${new Intl.DateTimeFormat("it-IT", {timeStyle: "short"}).format(currentShow.end_time ?? new Date())}`}</div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

function checkIfLiked(currentShow, currentShowDetails, favourites) {
  let currentlyLiked = false;
  favourites.forEach((fav) => {
    console.log("Favourite checking now: ", fav);
    if (currentShow.category === "TV Show") {
      if (fav.tvshow_id === currentShowDetails.id) { currentlyLiked = true; }
    } else {
      if (fav.movie_id === currentShowDetails.id) { currentlyLiked = true; }
    }
  });
  return currentlyLiked;
}

function handleLikeClick(currentShow, currentShowDetails, setIsLiked, favourites, updateFavourites, setUpdateFavourites, setUpdateLiked, updateLiked) {
  console.log("Entered in handleLikeClick() method");
  console.log("Favourites: ", favourites);
  let currentlyLiked = checkIfLiked(currentShow, currentShowDetails, favourites);
  setUpdateLiked(updateLiked + 1);
  setIsLiked(!currentlyLiked);
  setUpdateFavourites(updateFavourites + 1);
  console.log("Current Show ID: ", currentShowDetails.id);
}

export default Grid;
