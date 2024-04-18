import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from "react-oidc-context"
import { User, WebStorageStateStore } from 'oidc-client-ts'

const redirect_uri = "http://localhost:3000/";

const oidcConfig = {
  authority: "https://msp-idp.acscloud.eu/",
  client_id: "cysec-iocmanager",
  redirect_uri: redirect_uri,
  response_type: "code",
  client_secret: "Viq1TbVlyfXk0QMMB7FK5VB5vMCvmahL",
  post_logout_redirect_uri: redirect_uri,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  loadUserInfo: true,
  metadata: {
    issuer: "https://msp-idp.acscloud.eu/realms/master",
    authorization_endpoint: "https://msp-idp.acscloud.eu/realms/master/protocol/openid-connect/auth",
    token_endpoint: "https://msp-idp.acscloud.eu/realms/master/protocol/openid-connect/token",
    introspection_endpoint: "https://msp-idp.acscloud.eu/realms/master/protocol/openid-connect/token/introspect",
    userinfo_endpoint: "https://msp-idp.acscloud.eu/realms/master/protocol/openid-connect/userinfo",
    end_session_endpoint: "https://msp-idp.acscloud.eu/realms/master/protocol/openid-connect/logout",
    jwks_uri: "https://msp-idp.acscloud.eu/realms/master/protocol/openid-connect/certs",
  },
  onSigninCallback: (_user) => { window.history.replaceState({}, document.title, window.location.pathname) },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
