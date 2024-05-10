import React, { useEffect, useState, useRef } from "react";
import MoreIcon from "../assets/more.png";
import { useAppContext } from "../context/AppContext";
import ConfirmBox from "../components/Modals/ConfirmPopup";
import { getInitialsFromName } from "../common/utils";

function Sidebar() {
  const [info] = useAppContext();
  const moreIconRef = useRef(null);

  const {
    contextData,
    updateSelectedFields,
    updateSidebarAndRectangles,
    updateHoveredSection,
  } = info || {};

  const { rightbarData, selectedFields, currHoveredSection } =
    contextData || {};

  const [showCofirmPopup, toggleConfirmPopup] = useState(false);
  const [moreActionID, setMoreActionID] = useState(null);

  useEffect(() => {
    document.addEventListener("mousedown", detectOutsideClick);

    return () => {
      document.removeEventListener("mousedown", detectOutsideClick);
    };
  }, []);

  const handleCheckboxes = (event, key, value) => {
    let copy = { ...selectedFields };
    if (copy[key]) {
      delete copy[key];
    } else {
      copy[key] = value;
    }
    updateSelectedFields(copy);
  };

  const onSelectAllCheckboxes = (isAllSelected) => {
    if (isAllSelected) {
      updateSelectedFields({});
      return;
    }

    let copyData = { ...selectedFields };
    for (let val of rightbarData) {
      copyData[val.id] = val;
    }
    updateSelectedFields(copyData);
  };

  const onClickConfirm = () => {
    if (!Object.keys(selectedFields).length) return;
    toggleConfirmPopup(true);
  };

  const onHoverSectionItems = (event, data) => {
    updateHoveredSection(data);
  };

  const handleConfirmPopup = (bool) => {
    toggleConfirmPopup(bool);
  };

  const onFinalConfirmSelection = () => {
    handleConfirmPopup(false);
    updateSelectedFields({});
  };

  const onRemoveItems = (data) => {
    if (!rightbarData.length) return;
    const finalData = rightbarData.filter((d) => +d.id !== +data.id);
    updateSidebarAndRectangles(finalData);
    setMoreActionID(null);
  };

  //checks click otside the given ref element
  const detectOutsideClick = (event) => {
    if (moreIconRef.current && !moreIconRef.current.contains(event.target)) {
      setMoreActionID(null);
    }
  };

  let checkedFieldsArr = Object.keys(selectedFields) || [];
  let isAllSelected =
    rightbarData?.length &&
    checkedFieldsArr?.length &&
    checkedFieldsArr?.length === rightbarData?.length;

  if (!rightbarData || !rightbarData?.length) return null;

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-top">
            <div className="sidebar-name">Fields</div>
            <ul className="flex sidebar-list">
              <li>Regular Field</li>
              <li>Columns Field</li>
            </ul>
          </div>

          <ul>
            {rightbarData.length
              ? rightbarData.map((item, index) => {
                  const { label, content, p_title, id_auto_extract, id } =
                    item || {};

                    
                  return (
                    <li
                      className="sidebar-field"
                      key={id_auto_extract + "-" + index}
                      style={{
                        background:
                          +item?.id === +currHoveredSection?.id
                            ? "rgba(255,0,0,.3"
                            : "",
                      }}
                      onMouseOver={(event) => onHoverSectionItems(event, item)}
                    >
                      <div className="flex sidebar-field-left">
                        <div
                          className="sidebar-field-alpha"
                          style={{
                            background: item.fillColor
                              ? item.fillColor
                              : rightbarData[0]?.fillColor,
                            borderLeft: `0.4rem solid ${
                              item.strokeColor
                                ? item.strokeColor
                                : rightbarData[0]?.strokeColor
                            }`,
                          }}
                        >
                          {getInitialsFromName(label)}
                        </div>
                        <div>
                          {label}
                          <div className="sidebar-field-name">
                            {content?.value || ""}
                            <span>{p_title}</span>
                          </div>
                        </div>
                      </div>

                      <div className="sidebar-field-right flex">
                        <input
                          type="checkbox"
                          onChange={(e) => handleCheckboxes(e, id, item)}
                          checked={
                            selectedFields && selectedFields[id] ? true : false
                          }
                        />

                        <div className="moreIcon">
                          <img
                            src={MoreIcon}
                            alt="more"
                            onClick={() => setMoreActionID(item.id)}
                          />
                          {item.id === moreActionID ? (
                            <button
                              className="more-menu"
                              onClick={() => onRemoveItems(item)}
                              ref={moreIconRef}
                            >
                              Remove
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="flex sidebar-bottom">
          <button onClick={() => onSelectAllCheckboxes(isAllSelected)}>
            {isAllSelected ? "Deselect All" : "Select All"}
          </button>

          <button onClick={onClickConfirm} disabled={!checkedFieldsArr?.length}>
            Confirm
          </button>
        </div>
      </div>

      <ConfirmBox
        show={showCofirmPopup}
        handlePopup={handleConfirmPopup}
        onConfirm={onFinalConfirmSelection}
      />
    </>
  );
}

export default Sidebar;
