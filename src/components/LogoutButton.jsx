import React from "react";

const LogoutButton = (props) => {
  const logout = async () => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN || "";
    const clientId = import.meta.env.VITE_AUTH0_CLIENTID || "";
    const returnTo = "http://localhost:3000";

    const response = await fetch(
      `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
      { redirect: "manual" },
    ).then(() => { props.setIsAuth(false); });
    window.location.replace(response.url);
  };

  return (
    <button className="btn btn-ghost" onClick={() => logout()}>
      Logout
    </button>
  );
};

export default LogoutButton;
