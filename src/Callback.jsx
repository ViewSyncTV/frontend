import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PROCESS_CENTRIC_SERVICE_URL =
  import.meta.env.VITE_PROCESS_CENTRIC_SERVICE_URL || "localhost:3010";

function Callback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    fetch(`${PROCESS_CENTRIC_SERVICE_URL}/api/auth?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "aplication/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        window.location.replace("/");
      });
  }, [code]);

  return <div></div>;
}

export default Callback;
