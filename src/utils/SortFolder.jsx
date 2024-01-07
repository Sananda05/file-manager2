export const SortFolder = ({ folders, setFolders }) => {
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

  console.log(folders);

  setFolders(sortedFolders);
};
