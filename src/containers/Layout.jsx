import React from "react";
import CustomNavbar from "./CustomNavbar";
import CustomSidebar from "./CustomSidebar";


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
        isAuth={props.isAuth}
      >
        <CustomNavbar
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
          theme={props.theme}
          setTheme={props.setTheme}
          userName={props.userName}
          isAuth={props.isAuth}
          setIsAuth={props.setIsAuth}
          authData={props.authData}
        />
        <div className="px-4 pt-4 h-[90vh]">{props.children}</div>
      </CustomSidebar>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
