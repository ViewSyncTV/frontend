import React from "react";

const LogoutButton = () => {
  const logout = async () => {
    const domain = "dev-axq8uw2w5u4wzzfs.us.auth0.com";
    const clientId = "3huaI1RBJu9He7oNlwdazPjz6lW7mric";
    const returnTo = "http://localhost:3000";

    const response = await fetch(
      `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
      { redirect: "manual" },
    );

    window.location.replace(response.url);
  };

  return (
    <button className="btn btn-ghost" onClick={() => logout()}>
      Logout
    </button>
  );
};

export default LogoutButton;
