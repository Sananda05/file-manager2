import { useState, useRef, useEffect } from "react";
import Folders from "./Folders";

import addIcon from "../assets/icon/plus.png";

import "./FileManager.css";

import AddFolderModal from "../component/modal/AddFolderModal";
import { handleSortFolder } from "../utils/SortFolderfunction";
import { createNewFolder } from "../utils/AddNewFolder";
import BreadCrumbs from "./BreadCrumbs";

function FileManager() {
  const [parent, setParent] = useState(0);

  const [path, setPath] = useState([{ id: "", currentPath: "Main:" }]);

  const [color, setcolor] = useState(["#dae6f5"]);

  const [errorMessage, setErrorMessage] = useState("");

  const [selectedId, setselectedId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const folderNameRef = useRef("");

  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem("folders");

    return storedFolders ? JSON.parse(storedFolders) : {};
  });

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const handleModalOpener = (e) => {
    setIsOpen(!isOpen);
  };

  const handleAddNewFolder = () => {
    if (folderNameRef.current.value === "") {
      setErrorMessage("Please enter a folder name.");
      return;
    }

    const newFolderId = `id${Object.keys(folders).length + 1}`;
    const newFolder = {
      title: folderNameRef.current.value,
      parent,
      childs: [],
    };

    setFolders((prevFolders) => {
      if (selectedId === parent) {
        console.log(prevFolders[selectedId], "Prev Folders");
        console.log(selectedId, parent);
        console.log({ prev: prevFolders[parent].childs });

        if (!prevFolders[parent].childs.includes(newFolderId)) {
          prevFolders[parent].childs = [
            ...prevFolders[parent].childs,
            newFolderId,
          ];
        }
      }
      return {
        ...prevFolders,
        [newFolderId]: newFolder,
      };
    });

    setIsOpen(!isOpen);
    setErrorMessage("");
    folderNameRef.current.value = "";
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
      <BreadCrumbs path={path} setPath={setPath} setParent={setParent} />

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
          onClick={() => handleSortFolder({ folders, setFolders })}
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
        selectedId={selectedId}
        setselectedId={setselectedId}
      />

      {isOpen ? (
        <AddFolderModal
          isOpen={isOpen}
          handleAddNewFolder={handleAddNewFolder}
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
