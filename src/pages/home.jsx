import React, { useEffect } from "react";
import Header from "../components/Header";

import DocumentContainer from "../components/DocumentContainer";
import Sidebar from "../components/Sidebar";

import { useAppContext } from "../context/AppContext";

function home() {
  const [info] = useAppContext();
  const { contextData, getSectionsData } = info || {};
  const { pagesData } = contextData || {};

  useEffect(()=>{
    if(pagesData && pagesData["documents"]?.length){
      getSectionsData();
    }
  }, [pagesData]);

  return (
    <>
      <Header />
      <div className="flex col-gap1 section-main">
        <DocumentContainer />
        <Sidebar />
      </div>
    </>
  );
}
export default home;
