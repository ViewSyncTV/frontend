import { useState, useEffect} from "react";
import Grid from "../components/Grid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CustomCard from "../components/CustomCard";
import { getFavorites } from "../api/fetch_my_favorites";


function FavoritesPage() {
  const [favourites, setFavourites] = useState([]);
  useEffect( () => {
      getFavorites(favourites, setFavourites);
      // console.log("Loaded metadata of favs: ", favourites);
  }, []);
    
  /* REMOVE
  const postData = {
        movie_id: null, // o null se non presente
        tvshow_id: 9208 // o l'ID reale se presente
      };

  fetch("http://localhost:3010/api/tv-program/favorite",
  {
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
        
      });
      */
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
      {favourites.map((item, _) => {
        console.log("Item: ", item);
        return (
          <CustomCard
            title={item.title}
            description={item.data.description.substring(0, 150) + "..."}
            channel={"HBO"}
            airing_in={"30m"}
            color="bg-warning"
          />
        );
      })}
    </div>
  );
}

export default FavoritesPage;
