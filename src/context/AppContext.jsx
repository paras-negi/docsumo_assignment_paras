import React, { createContext, useContext, useState, useEffect } from "react";
import pagesInfo from "../db/pages.json";
import sectionsData from "../db/sections.json";
import colors from "../db/colors.json";

const MainContext = createContext();

export default function AppContext({ children }) {
  const [contextData, setContextData] = useState(initialContextData);
  const [theme, setTheme] = useState({ label: "Dark Mode", value: "dm" });

  useEffect(() => {
    getPagesData();
    detectSystemTheme();
  }, []);

  const detectSystemTheme = () =>{
    if (window.matchMedia) {
      // Detects system theme, by default it will pick syatem theme and update the page theme accordingly
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        handleTheme({}, "dark");
      } else {
        handleTheme({}, "light");
      }
    }
  }


/**
 * Import section data from db folder
 */
  const getSectionsData = async () => {
    const { data } = sectionsData || {};
    let { sections } = data || {};
    let usableData = sections[0]["children"];
    createRectanglesWithColors(usableData);
  };

  /**
   * Import pages data from db folder
   */
  const getPagesData = () => {
    const { data } = pagesInfo || {};
    setContextData({ ...contextData, pagesData: data });
  };

  /**
   * 
   * @param {Array} data 
   * @returns 
   * This function will create an array with corresponing colors for the Sidebar and Rectangles on canvas
   */
  const createRectanglesWithColors = (data) => {
    if (!data || !data.length) return;
    let rectanglesData = data.map((item) => {
      let main = item?.content ?? {};
      return {
        x: main?.position ? main?.position[0] : 0,
        y: main?.position ? main?.position[1] : 0,
        w: main?.position ? main?.position[2] : 0,
        h: main?.position ? main?.position[3] : 0,
        strokeColor: colors["data"]["colors"][item.id].stroke,
        fillColor: colors["data"]["colors"][item.id].fill,
        ...item,
      };
    });

    setContextData({
      ...contextData,
      rectanglesData,
      rightbarData: rectanglesData,
      sectionData: rectanglesData,
    });
  };

  const onUpdateZoom = (val) => {
    setContextData({ ...contextData, zoom: val });
  };

  const updateSelectedFields = (selectedFields) => {
    setContextData({ ...contextData, selectedFields });
  };

  const updateHoveredSection = (currHoveredSection) => {
    setContextData({ ...contextData, currHoveredSection });
  };

  const updateSidebarAndRectangles = (filteredArr) => {
    setContextData({
      ...contextData,
      rectanglesData: filteredArr,
      rightbarData: filteredArr,
    });
  };

  const handleTheme = (event, theme) => {
    let html = document.querySelector("html");
    console.log({ html });

    if (!html) return;
    html.setAttribute("data-theme", theme);
    setTheme({ label: themes[theme], value: theme });
  };

  return (
    <MainContext.Provider
      value={{
        contextData,
        theme,
        getSectionsData,
        getPagesData,
        createRectanglesWithColors,
        onUpdateZoom,
        updateSelectedFields,
        updateHoveredSection,
        updateSidebarAndRectangles,
        handleTheme,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export const useAppContext = () => {
  let contextData = useContext(MainContext) || initialContextData;
  return [contextData];
};

export const initialContextData = {
  loading: false,
  sectionData: [],
  rightbarData: [],
  pagesData: [],
  rectanglesData: [],
  hoveredSectionInfo: {},
  zoom: 0.4,
  selectedFields: {},
  currHoveredSection: {},
  theme: { label: "Dark Mode", value: "dark" },
};

const themes = {
  dark: "Dark Mode",
  light: "Light Mode",
};
