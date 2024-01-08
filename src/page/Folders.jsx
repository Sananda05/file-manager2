import React from "react";
import { useState } from "react";

import folderIcon from "../assets/icon/folder.png";
import optionIcon from "../assets/icon/options.png";

import "./Folders.css";
import AlertModal from "../component/modal/AlertModal";
import OptionModal from "../component/modal/OptionModal";

const Folders = ({
  parent,
  folders,
  setFolders,
  setParent,
  path,
  setPath,
  color,
  setcolor,
  selectedId,
  setselectedId,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [optionModal, setOptionModal] = useState(false);

  // const [selectedId, setselectedId] = useState(null);
  const [deleteParentId, setDeleteParentId] = useState(null);

  const colorList = ["#f67f90", "green", "yellow", "purple"];

  const handleFolderColor = (color) => {
    // setcolor(color);
    setFolders((prevFolders) => ({
      ...prevFolders,
      [selectedId]: {
        ...prevFolders[selectedId],
        color: color,
      },
    }));
  };

  const handleOptionModal = (parent, id) => {
    setOptionModal(!optionModal);
    setselectedId(id);
    setDeleteParentId(parent);
  };

  const handleDeleteConfirmation = () => {
    setShowAlert(false);
    deletefolder(deleteParentId, selectedId);
    // console.log(deleteParentId)
  };

  const handleAlertModal = () => {
    setShowAlert(!showAlert);
  };

  const handleFolderOpen = (id, name) => {
    setParent(id);

    setselectedId(id);

    let newPath = "/" + name;

    let temp_path = [...path];

    temp_path.push({ id: id, currentPath: newPath });

    setPath(temp_path);

    // console.log(path)
  };

  const deletefolder = (parentId, id) => {
    const updatedFolders = { ...folders };

    const childList = updatedFolders[id].childs;

    console.log("Child List", childList);

    for (let i = 0; i < childList.length; i++) {
      const child = childList[i];

      deletefolder(updatedFolders[id], child);
      console.log(updatedFolders[id], child);
      delete updatedFolders[child];
    }

    delete updatedFolders[id];

    const parentFolder = updatedFolders[parentId];

    if (parentFolder) {
      parentFolder.childs = parentFolder.childs.filter((child) => child !== id);
    }
    setFolders(updatedFolders);
    setOptionModal(!optionModal);
  };

  return (
    <div className="main_container">
      <div className="folderWrapper">
        {Object.keys(folders).map((id) => {
          let thisFolder = folders[id];

          if (thisFolder.parent !== parent) return null;
          return (
            <div
              key={id}
              className={`folder_content `}
              style={{
                backgroundColor: thisFolder.color,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleFolderOpen(id, thisFolder.title)}
              >
                <img
                  src={folderIcon}
                  alt="folder"
                  style={{ height: "24px", width: "24px" }}
                />
                <h4>{thisFolder.title}</h4>
              </div>
              <img
                src={optionIcon}
                alt="Add"
                style={{ height: "16px", width: "16px", marginLeft: "7rem" }}
                onClick={() => handleOptionModal(thisFolder.parent, id)}
              />
            </div>
          );
        })}

        {optionModal && (
          <OptionModal
            handleOptionModal={handleOptionModal}
            colorList={colorList}
            handleFolderColor={handleFolderColor}
            handleAlertModal={handleAlertModal}
            color={color}
          />
        )}

        {showAlert && (
          <AlertModal
            handleAlertModal={handleAlertModal}
            handleDeleteConfirmation={handleDeleteConfirmation}
          />
        )}
      </div>
    </div>
  );
};

export default Folders;
