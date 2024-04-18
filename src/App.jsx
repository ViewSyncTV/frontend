import { useState, lazy, useEffect } from "react";
import { fetch_my_assets } from "./api/fetch_my_assets";
import { useAuth, hasAuthParams } from "react-oidc-context";
import RaiPage from "./pages/RaiPage";
import MediasetPage from "./pages/MediasetPage";


import "./App.css";
import AssetType from "./types/AssetType";
import usePersistantState from "./components/usePersistantState";
import Grid from "./components/Grid";
const Layout = lazy(() => import("./containers/Layout"));

function App() {
  const [theme, setTheme] = usePersistantState("THEME_MODE", "dim"); // Defaults to dark theme
  const [hasTriedSignin, setHasTriedSignin] = useState(false); // Boilerplate from react-oidc-context github repo
  const [idToken, setidToken] = useState("");
  const [reloadCounter, setReloadCounter] = useState(0); // Used to force reload of apis when needed
  const [assets, setAssets] = useState([
    {
      "asset": "Mediaset",
      "category": "Palinsesto",
      "orderidx": 1,
      "link": "mediaset",
      "description": "",
    },
    {
      "asset": "Rai",
      "category": "Palinsesto",
      "orderidx": 2,
      "link": "rai",
      "description": "",
    },
    {
      "asset": "Sky",
      "category": "Palinsesto",
      "orderidx": 3,
      "link": "sky",
      "description": "",
    },
    {
      "asset": "All",
      "category": "Palinsesto",
      "orderidx": 4,
      "link": "all_channels",
      "description": "",
    },
    {
      "asset": "Favorites",
      "category": "For You",
      "orderidx": 5,
      "link": "favorites",
      "description": "",
    },
    {
      "asset": "Recommended",
      "category": "For You",
      "orderidx": 6,
      "link": "recommended",
      "description": "",
    },
    {
      "asset": "Reminders",
      "category": "For You",
      "orderidx": 7,
      "link": "popular",
      "description": "",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultTab, setDefaultTab] = usePersistantState(
    "DEFAULT_TAB",
    "mainpage"
  ); // Defaults to mainpage
  const [activeTab, setActiveTab] = usePersistantState(
    "ACTIVE_TAB",
    "mainpage"
  ); // Defaults to mainpage
  const [isDevelopment, setIsDevelopment] = useState(false); // Used to force reload of apis when needed
  const auth = useAuth();


  useEffect(() => {
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
          idToken={idToken}
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
                  "tabcontent " + (activeTab === "rai" ? "active" : "")
                }
                id="rai"
                style={
                  activeTab === "viewsynctv"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <RaiPage />
              </div>
              <div
                className={
                  "tabcontent " + (activeTab === "mediaset" ? "active" : "")
                }
                id="mediaset"
                style={
                  activeTab === "mediaset"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <MediasetPage />
              </div>
              
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default App;
