import { useState, useEffect} from "react";
import Grid from "../components/Grid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CustomCard from "../components/CustomCard";
import { getReminders } from "../api/fetch_my_reminders";
import { VITE_DEVELOPMENT_MODE, VITE_DEVELOPMENT_URL, VITE_PRODUCTION_URL } from "../constants";

function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  useEffect( () => {
      getReminders(reminders, setReminders);
      console.log("Loaded metadata of reminders: ", reminders);
  }, []);
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      {reminders.map((item, _) => {
        console.log("Item: ", item);
        console.log(item.title)
        return (
          <CustomCard
            title={item.title}
            description={item.description.substring(0, 150) + "..."}
            channel={item.channel}
            airing_in={calculateTimeDifference(item.start_time, item.endTime)}
            color="bg-warning"
            xmark
            xmarkHandler={() => handleDelete(item.id, reminders, setReminders)}
          />
        );

        function calculateTimeDifference(startTime, endTime) {
          const currentTime = new Date();
          const start = new Date(new Date(startTime).getTime() - 2 * 60 * 60 * 1000);
          const end = new Date(new Date(endTime).getTime() - 2 * 60 * 60 * 1000);
          const difference = start.getTime() - currentTime.getTime();
          const difference_end = currentTime.getTime() - end.getTime();
          const minutes = Math.floor(difference / 1000 / 60);
          const hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);

          if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} to`;
          } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} to`;
          } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} to`;
          } else if (difference_end > 0){
            return "Just now";
          }else{
            return "Expired"
          }
        }
      })}
    </div>
  );
}

function handleDelete(id, rems, setRems) {
  console.log("Delete button clicked with data: { id: ", id, " })");
  const postData = { tvprogram_id: id };
  let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
  fetch(backendUrl + "/api/tv-program/reminder", {
    method: "DELETE",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Returned DELETE reminder: ", data);
      setRems(rems.filter((item) => item.id !== id));
    });
}

export default RemindersPage;

/*

function FavoritesPage() {
  const [favourites, setFavourites] = useState([]);
  useEffect( () => {
      getFavorites(favourites, setFavourites);
      console.log("Loaded metadata of favs: ", favourites);
  }, []);
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      {favourites.map((item, _) => {
        console.log("Item: ", item);
        let urlto_movie = `https://www.themoviedb.org/${item.type === "tv-show" ? "tv" : "movie"}/${item.data.id}`;
        return (
          <CustomCard
            title={item.title}
            description={item.data.description.substring(0, 150) + "..."}
            channel={item.data.genres.join(", ")}
            airing_in={item.data.vote_average.toFixed(2) + "/10"}
            color="bg-warning"
            image_path={item.data.poster_path}
            url={urlto_movie}
            xmark
            xmarkHandler={() => handleDelete(item.data.id, item.type, favourites, setFavourites)}
          />
        );
      })}
    </div>
  );
}

function handleDelete(id, type, favs, setFavs) {
  console.log("Delete button clicked with data: { id: ", id, ", type: ", type, " })");
  const postData = { movie_id: null, tvshow_id: null };
  if (type === "tv-show") { postData.tvshow_id = id; }
  else { postData.movie_id = id; }
  let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
  fetch(backendUrl + "/api/tv-program/favorite", {
    method: "DELETE",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Returned DELETE favorite: ", data);
      setFavs(favs.filter((item) => item.data.id !== id));
    });
}

export default FavoritesPage;
*/