

const SortedFolders = ({folders, setFolders}) =>{

    console.log(folders)

    const foldersArray = Object.entries(folders).map(([key , value]) => ({id: key, ...value}))

    console.log("folders Array", foldersArray)

    foldersArray.sort((folder1, folder2) => {

        if(folder1.title < folder2.title){
            return -1;
        }
        if(folder1.title > folder2.title){
            return 1;
        }
        return 0;
})

  console.log(foldersArray)
  
  const sortedFolders = Object.assign({}, foldersArray)

//   setFolders(sortedFolders)

  console.log('sorted folder', sortedFolders)


  return (
    <div>{console.log('')}</div>
 )


}

export default SortedFolders