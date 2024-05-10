import React from "react";

export default function ConfirmPopup({ show, handlePopup, onConfirm }) {

  if (!show) return null;
  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-cross" onClick={()=>handlePopup(false)}>X</div>
        <p>Do you want to confirm the selection?</p>
        <div className="flex col-gap2">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={()=>handlePopup(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
