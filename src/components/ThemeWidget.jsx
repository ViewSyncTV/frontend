import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function ThemeWidget({ theme, setTheme, className }) {
  const toggleTheme = () => { setTheme(theme === "dim" ? "nord" : "dim"); };
  useEffect(() => { document.querySelector("html")?.setAttribute("data-theme", theme); }, [theme]);
  return (
    <label className={"swap swap-rotate p-3 mx-2 " + (className ?? "")}>
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on">
        <SunIcon className="w-6 h-6"/>
      </div>
      <div className="swap-off">
        <MoonIcon className="w-6 h-6"/>
      </div>
    </label>
  );
}

export default ThemeWidget;
