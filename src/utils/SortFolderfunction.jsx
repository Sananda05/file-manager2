export const handleSortFolder = ({ folders, setFolders }) => {
  const sortedFoldersArray = Object.entries(folders).sort(([, a], [, b]) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );

  // const foldersArray = Object.entries(folders);

  // console.log("folders Array", foldersArray);

  // foldersArray.sort((folder1, folder2) => {
  //   console.log(folder1, folder2);
  //   // if (folder1.title.toLowerCase() < folder2.title.toLowerCase()) {
  //   //   return -1;
  //   // }
  //   // if (folder1.title > folder2.title) {
  //   //   return 1;
  //   // }
  //   // return 0;
  // });

  // const sortedFolders = Object.fromEntries(foldersArray);

  const sortedFolders = Object.fromEntries(sortedFoldersArray);

  console.log(sortedFolders);

  setFolders(sortedFolders);
};
