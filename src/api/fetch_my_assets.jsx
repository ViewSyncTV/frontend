import { VITE_DEVELOPMENT_URL, VITE_PRODUCTION_URL, VITE_DEVELOPMENT_MODE } from "../constants";

async function fetch_my_assets(
  token,
  setReloadCounter,
  loading,
  setLoading
){
  if (
    token === undefined ||
    token === "" ||
    token === null
  ) {
    console.log("Email or token is undefined");
    sessionStorage.clear();
    return Promise.resolve();
  }
  if (loading !== undefined && loading === true) return;
  if (setLoading !== undefined) setLoading(true);
  let backendurl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
  // request with token in header
  return fetch(backendurl + "/get_assets/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (setLoading !== undefined) setLoading(false);
      console.log("fetch_my_assets: " + data.assetslist);
      if (data.status !== 200) {
        console.log("Error: ", data.detail);
        if ((data.detail).toLowerCase().includes("invalid token")) {
          console.log("Token is expired");
          sessionStorage.clear();
          window.location.reload();
        } else {
          alert("Error: " + data.detail)
        }
      }
      return data.assetslist;
    });
}

export { fetch_my_assets };
