import { useState, useEffect} from "react";
import Grid from "../components/Grid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CustomCard from "../components/CustomCard";


async function getFavoritesIds() {
  let favourites = await fetch("http://localhost:3010/api/tv-program/favorites",
    {
    method: "GET",
    credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        let movie_or_show = data.data.map((item) => item.movie_id ? "Movie" : "Show");
        let title = data.data.map((item)=> item.title);
        let favss = data.data.map((item)=> item.movie_id || item.tvshow_id)
        let fv = favss.map((item, idx) => {
          return {
            movie_or_show: movie_or_show[idx],
            fav_id: item
          };
        })
        return fv;
      });
  return favourites;
}

async function getMetadata(movie_or_show) {
  let metadata = await fetch(`http://localhost:3010/api/program-metadata/${movie_or_show}/${title}`, { method: "GET", credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Returned metadata: ", data.data);
      return {
        data: data.data,
        type: movie_or_show
      };
    });
  return metadata;
}

async function getAll(){
  
}

function FavoritesPage() {
  const [favourites, setFavourites] = useState([]);
  useEffect( () => {

    const c = async () => {

    let b = []
      let favs = await getFavoritesIds();
      for (let i = 0; i < favs.length; i++) {
        let metadata = await getMetadata(favs[i].movie_or_show === "Movie" ? "movie" : "tv-show");
        b.push(metadata);
      }
      setFavourites(b)
    }

    c();

    console.log("Loaded metadata of favs: ", favourites);
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
      {favourites.map((item, index) => {
        console.log("Item: ", item);
        return (
          <CustomCard
            title={item.data.title}
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
