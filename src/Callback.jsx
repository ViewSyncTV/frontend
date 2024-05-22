import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const PROCESS_CENTRIC_SERVICE_URL =
  import.meta.env.VITE_PROCESS_CENTRIC_SERVICE_URL || "localhost:3010";

function Callback(props) {
  const code = window.location.href.split("code=")[1];
  console.log("code: ", code)
  console.log("url: ", PROCESS_CENTRIC_SERVICE_URL)
  
  useEffect(() => {
    fetch(`${PROCESS_CENTRIC_SERVICE_URL}/api/auth?code=${code}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "aplication/json",
      },
    })
      .then((res) => res.json())
      .then(({data}) => {
        console.log("Data: ", data);
        props.setIsAuth(true);
        props.setAccessToken(code);
        props.setAuthData(jwtDecode(data.id_token));
        window.location.replace("/");
      });
  }, [code]);
  return <div></div>;
}

export default Callback;
