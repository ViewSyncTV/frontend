import React from "react";
import { VITE_DEVELOPMENT_MODE, VITE_DEVELOPMENT_URL_FRONT, VITE_PRODUCTION_URL_FRONT } from "../constants";

const LogoutButton = (props) => {
  const logout = async () => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN || "";
    const clientId = import.meta.env.VITE_AUTH0_CLIENTID || "";
    let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL_FRONT : VITE_PRODUCTION_URL_FRONT;
    // const returnTo = "http://localhost:3000";
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <button className="btn btn-ghost" onClick={() => logout()}>
      Logout
    </button>
  );
};

export default LogoutButton;
