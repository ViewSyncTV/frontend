import React from "react";

const LoginButton = () => {
  const login = async () => {
    const domain = "dev-axq8uw2w5u4wzzfs.us.auth0.com";
    const clientId = "3huaI1RBJu9He7oNlwdazPjz6lW7mric";
    const audience = "https://viewsynctv.com/api";
    const scope = "write:comments";
    const responseType = "code";
    const redirectUri = "http://localhost:3000/callback";

    window.location.replace(`https://${domain}/authorize?audience=${audience}&scope=${scope}&response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`);
  };

  return (
    <button className="btn btn-ghost" onClick={() => login()}>
      Login
    </button>
  );
};

export default LoginButton;
