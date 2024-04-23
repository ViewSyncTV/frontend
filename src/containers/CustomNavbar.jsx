import React, { useState, useEffect } from "react";
import ThemeWidget from "../components/ThemeWidget";
import {
  Bars3Icon,
  BookOpenIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import CustomPhoto from "../components/CustomPhoto";

function CustomNavbar(props) {
  const [bouncingQuery, setBouncingQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setSearchQuery(bouncingQuery);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [bouncingQuery]);

  return (
    <div className="w-full navbar p-4">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
          <Bars3Icon className="w-6 h-6" />
        </label>
      </div>
      <div className="flex-1 mr-4">
      </div>
      
      <ThemeWidget
        theme={props.theme}
        setTheme={props.setTheme}
        className="flex-none"
      />
      <CustomPhoto userName={props.userName} isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
    </div>
  );
}

export default CustomNavbar;
