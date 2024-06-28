import React, { useEffect } from "react";
import {
  CheckCircleIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";

import ViewSyncTVLogo from "./logo.svg";
import ViewSyncTVLogoLight from "./logo_light.svg";
import AssetType from "../types/AssetType";

function CustomSidebar(props) {
  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    if (props.assets != null && props.assets.length > 0) {
      console.log("Assets: ", props.assets);
      props.assets.sort((a, b) => {
        if (a.orderidx < b.orderidx) {
          return -1;
        }
        if (a.orderidx > b.orderidx) {
          return 1;
        }
        return 0;
      });
      console.log("Ordered Assets: ", props.assets);
      // remove the mainpage asset
      let categories = props.assets.map((asset) => {
        if (asset.asset === "mainpage") {
          return "";
        }
        return asset.category;
      });
      // remove duplicates
      categories = categories.filter((v, i, a) => a.indexOf(v) === i);
      setCategories(categories);
      console.log("Categories: ", categories);
    }
  }, [props.assets]);

  return (
    <div
      className={
        "shadow bg-base-200 drawer lg:drawer-open " +
        (props.className ? props.className : "")
      }
    >
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col overflow-y-scroll">{props.children}</div>
      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul
          className="menu w-60 min-h-full bg-base-100 text-base-content"
          key={1}
        >
          <div
            className="hidden p-4 md:inline cursor-pointer"
            onClick={() => props.setActiveTab(props.defaultTab)}
          >
            {props.theme === "dim" ? (
              <img
                src={ViewSyncTVLogo}
                className="w-60 h-24 invert"
                width="50rem"
                height="50rem"
                alt="ViewSyncTV logo, in dark mode"
              />
            ) : (
              <img
                src={ViewSyncTVLogoLight}
                className="w-60 h-24"
                width="50rem"
                height="50rem"
                alt="ViewSyncTV logo, in light mode"
              />
            )}
          </div>
          <div className="divider" />
          {
            // For each asset, we look for distinct categories and we print them as menu titles
            categories.map((category) => {
              if (category.trim() === "") return;
              if (!props.isAuth && category === "For You") return;
              return (
                <ul className="menu" key={category}>
                  <li>
                    <details open>
                      <summary className="font-bold text-slate-500">
                        {category}
                      </summary>
                      <ul>
                        {
                          // For each asset, we look for distinct categories and we print them as menu titles
                          props.assets?.map((asset) => {
                            if (asset.category === category) {
                              return (
                                <li key={asset.link}>
                                  <a
                                    onClick={() =>
                                      props.setActiveTab(
                                        (asset.link).toLowerCase()
                                      )
                                    }
                                  >
                                    {asset.asset}
                                  </a>
                                </li>
                              );
                            }
                          })
                        }
                      </ul>
                    </details>
                  </li>
                </ul>
              );
            })
          }
          <div className="absolute bottom-0 p-4">
            <div className="alert alert-info shadow-lg mb-1 justify-normal">
              <span className="whitespace-pre pl-8 pr-6">ViewSyncTV™</span>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default CustomSidebar;
