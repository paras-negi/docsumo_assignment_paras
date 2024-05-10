import React, { useEffect, useState } from "react";
import MainDoc from "./DocumentPreviewer";
import { useAppContext } from "../context/AppContext";

function DocumentSection() {
  const [info] = useAppContext();
  const { contextData, createRectanglesWithColors, onUpdateZoom} = info || {};
  const { pagesData, rectanglesData, sectionData, zoom } = contextData || {};
  const { documents } = pagesData || {};

  const [pageIndex, setPageIndex] = useState(0);
  const [pageInfo, setPageInfo] = useState([]);

  useEffect(()=>{
    if(sectionData && sectionData.length){
      createRectanglesWithColors();
    } 
  },[sectionData])

  
  useEffect(() => {
    if (documents) {
      let [{ pages }] = documents || [{}];
      if (pages && pages.length) {
        setPageInfo(pages);
        let initialImageWidth = pages[pageIndex]["image"]["width"];
        let initialImageHeight =  pages[pageIndex]["image"]["height"];

        let imgZoom = getInitialPageZoom(initialImageWidth, initialImageHeight);
        onUpdateZoom(imgZoom);
      }
    }
  }, [documents]);

 
  /**
   * 
   * @param {Number} imgWidth 
   * @param {Number} imgHeight 
   * @returns A min of hight and width values which will be used to calculate the initial page zoom
   */
  const getInitialPageZoom = (imgWidth, imgHeight) => {
    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;

    const zoomWidth = vpWidth / imgWidth;
    const zoomHeight = vpHeight / imgHeight;
    
    return Math.min(zoomWidth, zoomHeight);
  };

  /**
   * Handles zoom in
   */
  const handleZoomIn = () =>{
    if(zoom < 1 ){
      onUpdateZoom(zoom + 0.25)
    }
  }

   /**
   * Handles zoom out
   */
  const handleZoomOut = () =>{
    if(zoom > 0.5){
      onUpdateZoom(zoom - 0.25)
    }
  }


  return (
    <div className="document">
      <div className="document-inner">

      <MainDocContainer show={rectanglesData.length} pageInfo={pageInfo} pageIndex={pageIndex}/>

      <div className="document-zoom">
        <div className="document-btn">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default DocumentSection;

const MainDocContainer = ({show, pageInfo, pageIndex})=>{
  if(!show) return null;

  return <MainDoc docInfo={pageInfo} docIndex={pageIndex} />
}
