export const AddNewFolder = ({
  e,
  folderNameRef,
  setErrorMessage,
  folders,
  setFolders,
  parent,
  setIsOpen,
  isOpen,
}) => {
  e.preventDefault();

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
    if (prevFolders[parent]) {
      prevFolders[parent]?.childs.push(newFolderId);
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
