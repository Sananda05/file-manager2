import React, { useState } from "react";

const BreadCrumbs = ({parent, folders, setParent}) =>{

    const [path, setPath] = useState([])


    return(
        <div>
           {Object.keys(folders).map(id =>{
              let thisFolder = folders[id];
              if(thisFolder.parent === parent)
              {
              let newPath = '/' + thisFolder.title
        
              let temp_path = [...path]

              temp_path.push({currentPath:newPath});

              setPath(temp_path); 
              }
        })}
</div>
    )
}

export default BreadCrumbs;