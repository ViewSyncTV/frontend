import React from "react";


const LoginButton = () => {
  const login = async () => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN || "";
    const clientId = import.meta.env.VITE_AUTH0_CLIENTID || "";
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE || "";
    const scope = import.meta.env.VITE_AUTH0_SCOPE || "";
    const responseType = import.meta.env.VITE_AUTH0_RESPONSE_TYPE || "";
    const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI || "";

    window.location.replace(
      `https://${domain}/authorize?audience=${audience}&scope=${scope}&response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`,
    );
  };

  return (
    <button className="btn btn-ghost" onClick={() => login()}>
      Login
    </button>
  );
};

export default LoginButton;
