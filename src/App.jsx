import React, { useState, lazy, useEffect } from "react";
import { fetch_my_assets } from "./api/fetch_my_assets";
import Live from "./pages/Live";
import FavoritesPage from "./pages/FavoritesPage";
import RecommendedPage from "./pages/RecommendedPage";
import RemindersPage from "./pages/RemindersPage";
import Callback from "./Callback";

import "./App.css";
import AssetType from "./types/AssetType";
import usePersistantState from "./components/usePersistantState";
import Grid from "./components/Grid";
const Layout = lazy(() => import("./containers/Layout"));

function App(props) {
  const [theme, setTheme] = usePersistantState("THEME_MODE", "dim"); // Defaults to dark theme
  const [hasTriedSignin, setHasTriedSignin] = useState(false); // Boilerplate from react-oidc-context github repo
  const [accessToken, setAccessToken] = usePersistantState("ACCESS_TOKEN", "");
  const [reloadCounter, setReloadCounter] = useState(0); // Used to force reload of apis when needed
  const [assets, setAssets] = useState([
    {
      "asset": "All Channels",
      "category": "Live",
      "orderidx": 1,
      "link": "all_channels",
      "description": "",
    },
    {
      "asset": "Mediaset",
      "category": "Live",
      "orderidx": 2,
      "link": "mediaset",
      "description": "",
    },
    {
      "asset": "Rai",
      "category": "Live",
      "orderidx": 3,
      "link": "rai",
      "description": "",
    },
    {
      "asset": "Favorites",
      "category": "For You",
      "orderidx": 4,
      "link": "favorites",
      "description": "",
    },
    {
      "asset": "Recommended",
      "category": "For You",
      "orderidx": 5,
      "link": "recommended",
      "description": "",
    },
    {
      "asset": "Reminders",
      "category": "For You",
      "orderidx": 6,
      "link": "popular",
      "description": "",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = usePersistantState("IS_AUTH", false);
  const [authData, setAuthData] = usePersistantState("AUTH_DATA", {});
  const [defaultTab, setDefaultTab] = usePersistantState(
    "DEFAULT_TAB",
    "mainpage"
  ); // Defaults to mainpage
  const [activeTab, setActiveTab] = usePersistantState(
    "ACTIVE_TAB",
    "mainpage"
  ); // Defaults to mainpage
  const [isDevelopment, setIsDevelopment] = useState(false); // Used to force reload of apis when needed

  useEffect(() => { if (!isAuth) { setAccessToken(""); console.log("Now removing old access token!"); } else { console.log("Welcome: ", accessToken); } }, [isAuth]);
  useEffect(() => {
    if (authData !== undefined) {
      console.log("Data: ", authData);
    }
    if (assets !== undefined && assets.length > 0) {
      console.log("Assets: ", assets);
    }
  }, [assets]);
  useEffect(() => {
    if (
      window.location.href.includes(
        "viewsynctv.duckdns.org"
      )
    ) {
      setIsDevelopment(false);
    } else {
      setIsDevelopment(true);
    }
  }, []);


  if (window.location.href.includes("callback")) {
    return <Callback setIsAuth={setIsAuth} setAccessToken={setAccessToken} setAuthData={setAuthData} />;
  }


  return (
    <>
      { (
        <Layout
          assets={assets}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          setLoading={setLoading}
          setActiveTab={setActiveTab}
          defaultTab={defaultTab}
          theme={theme}
          setTheme={setTheme}
          isDevelopment={isDevelopment}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          authData={authData}
          className=""
        >
          <div className="card block bg-base-100 shadow-lg overflow-y-scroll">
            <div className="card-body relative">
              <div
                className={
                  "tabcontent " + (activeTab === "mainpage" ? "active" : "")
                }
                id="mainpage"
                style={
                  activeTab === "mainpage"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <div className="hero min-h-[80vh]">
                  <div className="text-center hero-content">
                    <div className="max-w-md">
                      <h1 className="mb-5 text-5xl font-bold">
                        Welcome to the ViewSyncTV!
                      </h1>
                      <p className="mb-5">
                      This is ViewSyncTV, a user-friendly platform 
                      where you can effortlessly explore and keep track of your 
                      favorite TV channels' schedules.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  "tabcontent " + ((activeTab === "all_channels" || activeTab === "rai" || activeTab === "mediaset") ? "active" : "")
                }
                id="live"
                style={
                  (activeTab === "all_channels" || activeTab === "rai" || activeTab === "mediaset")
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <Live ch={activeTab} />
              </div>
              <div
                className={
                  "tabcontent " + (activeTab === "favorites" ? "active" : "")
                }
                id="favorites"
                style={
                  activeTab === "favorites"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <FavoritesPage />
            </div>
            <div
                className={
                  "tabcontent " + (activeTab === "recommended" ? "active" : "")
                }
                id="recommended"
                style={
                  activeTab === "recommended"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <RecommendedPage />
            </div>
            <div
                className={
                  "tabcontent " + (activeTab === "popular" ? "active" : "")
                }
                id="popular"
                style={
                  activeTab === "popular"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <RemindersPage />
            </div>
          </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default App;
