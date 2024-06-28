import { useState, useEffect} from "react";
import Grid from "../components/Grid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CustomCard from "../components/CustomCard";
import { getFavorites } from "../api/fetch_my_favorites";
import { VITE_DEVELOPMENT_MODE, VITE_DEVELOPMENT_URL, VITE_PRODUCTION_URL } from "../constants";

function FavoritesPage(isActive) {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
      getFavorites(favourites, setFavourites);
      console.log("Loaded metadata of favs: ", favourites);
  }, []);
  useEffect(() => { console.log("Reloading favorites..."); getFavorites(favourites, setFavourites); }, [isActive]);
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      {favourites.map((item, _) => {
        console.log("Item: ", item);
        let urlto_movie = "";
        if (item.type && item.data && item.data.id) { urlto_movie = `https://www.themoviedb.org/${item.type === "tv-show" ? "tv" : "movie"}/${item.data.id}`; }
        item.data.description = item.data.description ? item.data.description : "No description available";
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
