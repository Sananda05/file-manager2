import { useState, useRef, useEffect } from "react";
import Folders from "./Folders";

import addIcon from "../assets/icon/plus.png";
import folderIcon from "../assets/icon/folder.png";

import "./FileManager.css";

import AddFolderModal from "../component/modal/AddFolderModal";
import { SortFolder } from "../utils/SortFolderfunction";
import { AddNewFolder } from "../utils/AddNewFolder";

function FileManager() {
  const [parent, setParent] = useState(0);

  const [path, setPath] = useState([{ id: "", currentPath: "Main:" }]);

  const [color, setcolor] = useState(["#dae6f5"]);

  const [errorMessage, setErrorMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const folderNameRef = useRef("");

  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem("folders");

    return storedFolders
      ? JSON.parse(storedFolders)
      : {
          //   id1: { title: 'Folder 1', parent: 0, childs: ['id4', 'id5'], color:color },
          //   id2: { title: 'Folder 2', parent: 0, childs: ['id3'], color:color },
          //   id3: { title: 'Folder 2.1', parent: 'id2', childs: [], color:color },
          //   id4: { title: 'Folder 1.1', parent: 'id1', childs: [], color:color },
          //   id5: { title: 'Folder 1.2', parent: 'id1', childs: [], color:color },
        };
  });

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const handleModalOpener = (e) => {
    setIsOpen(!isOpen);
  };

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
    <div className="main_container">
      <div className="add_button" onClick={handleModalOpener}>
        <img
          src={addIcon}
          alt="Add"
          style={{ height: "16px", width: "16px" }}
        />
        <p style={{ fontSize: "14px" }}>Add New Folder</p>
      </div>
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

      {/* <BreadCrumbs parent={parent} folders={folders} setFolders={setFolders} setParent={setParent}/> */}
      <div className="header_section">
        <h4
          style={{
            color: "black",
            height: "100px",
            width: "300px",
            marginTop: "6rem",
          }}
        >
          Folders
        </h4>
        <button
          className="sort_button"
          onClick={() => SortFolder({ folders, setFolders })}
        >
          Sort A~Z
        </button>
      </div>
      <Folders
        className="file_path"
        parent={parent}
        folders={folders}
        setFolders={setFolders}
        setParent={setParent}
        path={path}
        setPath={setPath}
        color={color}
        setcolor={setcolor}
      />

      {isOpen ? (
        <AddFolderModal
          isOpen={isOpen}
          handleAddNewFolder={(e) =>
            AddNewFolder({
              e,
              folderNameRef,
              setErrorMessage,
              folders,
              setFolders,
              parent,
              setIsOpen,
              isOpen,
            })
          }
          folderNameRef={folderNameRef}
          errorMessage={errorMessage}
          handleModalOpener={handleModalOpener}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default FileManager;
