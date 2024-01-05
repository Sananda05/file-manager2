// import { v4 as uuidv4 } from 'uuid';

import { useState, useRef, useEffect } from "react";
import Folders from "./Folders";

import addIcon from "../assets/icon/plus.png";
import folderIcon from "../assets/icon/folder.png";

import "./FileManager.css";
import BreadCrumbs from "./BreadCrumbs";
import { CleaningServices } from "@mui/icons-material";

function FileManager() {
  const [parent, setParent] = useState(0);

  const [path, setPath] = useState([{ id: "", currentPath: "Main:" }]);

  const [color, setcolor] = useState(["#dae6f5"]);

  // const [folders, setFolders] = useState({
  //     id1: {title: 'Folder 1', parent: 0, childs:['id4', 'id5']},
  //     id2: {title: 'Folder 2', parent: 0, childs:['id3']},
  //     id3: {title: 'Folder 2.1', parent: 'id2', childs:[]},
  //     id4: {title: 'Folder 1.1', parent: 'id1', childs:[]},
  //     id5: {title: 'Folder 1.2', parent: 'id1', childs:[]},
  // })

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

  const [isOpen, setIsOpen] = useState(false);

  const folderNameRef = useRef("");

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const handleModalOpener = (e) => {
    setIsOpen(!isOpen);
  };

  const handleFolderSort = () => {
    const foldersArray = Object.entries(folders).map(([key, value]) => ({
      id: key,
      ...value,
    }));

    console.log("folders Array", foldersArray);

    foldersArray.sort((folder1, folder2) => {
      if (folder1.title < folder2.title) {
        return -1;
      }
      if (folder1.title > folder2.title) {
        return 1;
      }
      return 0;
    });

    const sortedFolders = Object.assign({}, foldersArray);

    console.log(sortedFolders);

    setFolders(sortedFolders);
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

  const handleAddNewFolder = (e) => {
    e.preventDefault();

    const newFolderId = `id${Object.keys(folders).length + 1}`;
    const newFolder = {
      title: folderNameRef.current.value,
      parent,
      childs: [],
    };

    // if(e.key === 'Enter')
    // {
    //     setFolders((prevFolders) => ({
    //         ...prevFolders,
    //         [newFolderId]: newFolder,
    //         }));

    // }

    setFolders((prevFolders) => {
      if (prevFolders[parent]) {
        prevFolders[parent]?.childs.push(newFolderId);
      }

      return {
        ...prevFolders,
        [newFolderId]: newFolder,
      };
    });

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
        <button className="sort_button" onClick={handleFolderSort}>
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
        <div className="modal_container">
          <div className={`modal ${isOpen ? "open" : ""}`}>
            <div className="modal-content">
              <form onSubmit={handleAddNewFolder}>
                <input
                  type="text"
                  placeholder="Folder Name"
                  id="folder_name"
                  name="name"
                  ref={folderNameRef}
                />
                <div className="modal_button_group">
                  <button className="cancel_btn" onClick={handleModalOpener}>
                    cancel
                  </button>
                  <button className="create_btn" type="submit">
                    create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default FileManager;
