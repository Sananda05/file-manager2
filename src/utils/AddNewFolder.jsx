import { computeHeadingLevel } from "@testing-library/react";

export const createNewFolder = ({
  folderNameRef,
  setErrorMessage,
  folders,
  setFolders,
  parent,
  setIsOpen,
  isOpen,
  selectedId,
}) => {
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
    console.log("hi");
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
