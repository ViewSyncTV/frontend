import React from "react";
import CustomNavbar from "./CustomNavbar";
import CustomSidebar from "./CustomSidebar";
import AssetType from "../types/AssetType";
// import Footer from "./Footer";

function Layout(props) {
  return (
    <div className={props.className ? props.className : ""}>
      <CustomSidebar
        assets={props.assets}
        theme={props.theme}
        setTheme={props.setTheme}
        setActiveTab={props.setActiveTab}
        defaultTab={props.defaultTab}
        loading={props.loading}
        isDevelopment={props.isDevelopment}
      >
        <CustomNavbar
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
          theme={props.theme}
          setTheme={props.setTheme}
          idToken={props.idToken}
          userName={props.userName}
        />
        <div className="px-4 pt-4 h-[90vh]">{props.children}</div>
        <div className="sticky bottom-0 mb-0 pb-0 w-full lg:hidden">
          {props.loading ? (
            <progress className="progress progress-info text-secondary h-1 w-full mx-4" />
            ) : (
            <progress className="progress progress-success text-secondary h-1 w-full mx-4" value="100" max="100" />
          )}
        </div>
      </CustomSidebar>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
