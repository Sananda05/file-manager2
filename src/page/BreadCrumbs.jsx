import React from "react";

import folderIcon from "../assets/icon/folder.png";

const BreadCrumbs = ({ path, setPath, setParent }) => {
  const handlePathClick = (id) => {
    const filteredPath = path.filter((item, index) => index <= id);

    setPath(filteredPath);

    let clickedPath = path[id];

    // console.log("clickedPath", clickedPath)

    if (clickedPath.id === "") {
      setParent(0);
    } else {
      setParent(clickedPath.id);
    }
    // console.log(clickedPath.id)
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5rem",
        gap: "10px",
      }}
    >
      <img
        src={folderIcon}
        alt="folder"
        style={{ height: "16px", width: "16px", marginLeft: "7rem" }}
      />
      <div className="file_path">
        {Object.keys(path).map((id) => {
          let pathHistory = path[id];
          return (
            <a href="/" key={id} onClick={(e) => handlePathClick(id)}>
              <p>{pathHistory.currentPath}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BreadCrumbs;
