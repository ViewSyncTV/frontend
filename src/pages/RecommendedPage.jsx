import { useState, useEffect} from "react";
import Grid from "../components/Grid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CustomCard from "../components/CustomCard";
import { getFavorites } from "../api/fetch_my_favorites";
import { getRecommendedIds } from "../api/fetch_my_recommended";

function RecommendedPage() {
  const [favs, setFavs] = useState([]);
  const [recs, setRecs] = useState([]);
  useEffect( () => {
    console.log("Now getting favorites...");
    getFavorites(favs, setFavs);
    console.log("Favorites: ", favs);
    console.log("Recommended: ", recs);
  }, []);
  useEffect(() => {
    console.log("Now getting recommended...");
    console.log("Favorites: ", favs);
    console.log("Recommended: ", recs);
    getRecommendedIds(favs)
      .then((data) => {
        console.log("getRecommendedIds() returned: ", data);
        setRecs(data);
      });
  }, [favs]);
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      {recs.map((item, _) => {
        console.log("Item: ", item);
        //let genres = item.data.genres ? item.data.genres.join(", ") : "";
        //let airing_in = item.data.vote_average ? item.data.vote_average.toFixed(2) + "/10" : "";
        let item_type = item.type === "movie" ? "Movie" : "TV Show";
        let urlto_movie = `https://www.themoviedb.org/${item.type === "tv-show" ? "tv" : "movie"}/${item.data.id}`;
        return (
          <CustomCard
            title={item.title}
            description={item.data.description.substring(0, 150) + "..."}
            channel={item_type}
            airing_in={""}
            color="bg-info"
            image_path={item.data.poster_path}
            url={urlto_movie}
          />
        );
        
      })}
    </div>
  );
}

export default RecommendedPage;
