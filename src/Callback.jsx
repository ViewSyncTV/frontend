import React, { useEffect } from "react";
import queryString from "node:querystring";

const PROCESS_CENTRIC_SERVICE_URL = import.meta.env.VITE_PROCESS_CENTRIC_SERVICE_URL || "localhost:3010";

const Callback = ({ location }) => {
  const { code } = queryString.parse(location.search);

  useEffect(() => {
    fetch(`${PROCESS_CENTRIC_SERVICE_URL}/api/callback?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "aplication/json",
      },
    }).then((res) => res.json());
  }, [code]);

  return <div></div>;
};

export default Callback;
