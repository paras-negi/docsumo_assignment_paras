import React, { useEffect, useRef } from "react";
import image from "../assets/main_img.jpg";
import { useAppContext } from "../context/AppContext";

export default function DocumentPreviewer({ docInfo, docIndex }) {
  const canvasRef = useRef(null);

  const [info] = useAppContext();
  const { contextData, updateHoveredSection } = info || {};
  const { rectanglesData, zoom, currHoveredSection } = contextData || {};
  
  useEffect(() => {
    if (docInfo && docInfo.length && docInfo[docIndex]) {
      handleCanvas(zoom,currHoveredSection,rectanglesData);
    }

    return ()=>{
      canvasRef.current.onmousemove=null;
    }
  }, [docInfo, zoom, currHoveredSection, rectanglesData]);


  /**
   * 
   * @param {Number} zoom 
   * @param {Object} currHoveredSection 
   * @param {Array} rectanglesData 
   * This function perform all the required tasks on Document. It takes iamge and draws it on canvas and updated it according to events
   */
  const handleCanvas = (zoom, currHoveredSection, rectanglesData) => {
    let img = new Image();
    img.src = image;

    img.onload = () => {
      let ctx = canvasRef.current.getContext("2d");

      const sWidth = img.width * zoom;
      const sHeight = img.height * zoom;

      canvasRef.current.width = sWidth;
      canvasRef.current.height = sHeight;

      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, sWidth, sHeight);

      for (var i = 0; i < rectanglesData.length; i++) {
        const { x, y, w, h, fillColor, strokeColor, id } = rectanglesData[i];

        if (fillColor) {
          ctx.lineWidth = 0.5;
          if (+currHoveredSection.id === +id) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.strokeStyle = "rgb(255 0 0)";
          } else {
            ctx.fillStyle = fillColor;
            ctx.strokeStyle = strokeColor;
          }

          const scaledX = x * zoom;
          const scaledY = y * zoom;
          const scaledW = (w - x) * zoom; // Calculate width
          const scaledH = (h - y) * zoom; // Calculate height
          ctx.beginPath();
          ctx.rect(scaledX, scaledY, scaledW, scaledH);
          ctx.stroke();
          ctx.fill();
        }
      }

      canvasRef.current.onmousemove = (event) => handleMouseMove(event, zoom);
    };

    img.onerror = (error) => {
      console.log("error", error);
    };
  };

  /**
   * 
   * @param {Object} event 
   * @param {Number} zoom 
   * This function handles mouse movements on rectangles drawn on canvas
   */
  function handleMouseMove(event, zoom) {
    let rect = canvasRef.current.getBoundingClientRect();

    let x = (event.clientX - rect.left) / zoom;
    let y = (event.clientY - rect.top) / zoom;

    let hoveredSection = rectanglesData.find((rect) => {
      return x >= rect.x && x <= rect.w && y >= rect.y && y <= rect.h;
    });

    if (hoveredSection) {
      updateHoveredSection(hoveredSection);
    } else {
      updateHoveredSection({});
    }
  }

  if (!docInfo || !docInfo.length || !docInfo[docIndex]) return null;
  return <canvas ref={canvasRef}></canvas>;
}
