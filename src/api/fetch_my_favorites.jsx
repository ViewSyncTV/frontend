async function getFavoritesIds() {
  let favourites = await fetch("http://localhost:3010/api/tv-program/favorites",
    {
    method: "GET",
    credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("tv-show/favorites respose:", data.data);
        let movie_or_show = data.data.map((item) => item.movie_id ? "Movie" : "Show");
        let title = data.data.map((item)=> item.title);
        let favss = data.data.map((item)=> item.movie_id || item.tvshow_id)
        let fv = favss.map((item, idx) => {
          return {
            movie_or_show: movie_or_show[idx],
            fav_id: item,
            title: title[idx]
          };
        })
        return fv;
      });
  return favourites;
}

async function getMetadata(movie_or_show, title) {
  let metadata = await fetch(`http://localhost:3010/api/program-metadata/${movie_or_show}/${title}`, { method: "GET", credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Returned metadata: ", data);
      return {
        data: data.data,
        type: movie_or_show,
        title: title,
      };
    });
  return metadata;
}

export function getFavorites(favourites, setFavourites) {
  const c = async () => {
    let b = [];
    let favs = await getFavoritesIds();
    console.log("getFavoritesIds(): ", favs);
    for (let i = 0; i < favs.length; i++) {
      let metadata = await getMetadata(favs[i].movie_or_show === "Movie" ? "movie" : "tv-show", favs[i].title);
      b.push(metadata);
    }
    setFavourites(b);
  }
  c();
  console.log("Loaded metadata of favs: ", favourites);
}
