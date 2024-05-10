import React from "react";
import { useAppContext } from "../context/AppContext";

function Header() {
  const [info] = useAppContext();
  const { theme, handleTheme } = info || {};
  
  return (
    <div className="header flex align-center justify-between">
      Review Screen
      <div className="header-mode flex align-center col-gap1">
        {theme.label}
        <div className="toggle flex">
          <input
            type="checkbox"
            id="toggle"
            onChange={(e) => handleTheme(e, theme.value == "dark" ? "light" : "dark")}
            // checked={theme == "dark" ? true : false}
          />
          <label htmlFor="toggle" className="toggle_btn"></label>
        </div>
      </div>
    </div>
  );
}

export default Header;
