import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


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
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Data: ", res);
        props.setIsAuth(true);
        props.setAccessToken(code);
        props.setAuthData(res.data.user);
        window.location.replace("/");
      });
  }, [code]);
  return <div></div>;
}

export default Callback;
