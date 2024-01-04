import React from "react";
import { useState } from "react";

import folderIcon from '../assets/icon/folder.png'
import deleteIcon from '../assets/icon/remove.png'

import './Folders.css'

const Folders  = ({parent, folders, setFolders, setParent, path, setPath}) =>{

    const [showAlert, setShowAlert] = useState(false);

    const [deleteId, setDeleteId] = useState(null)
    const [deleteParentId, setDeleteParentId] = useState(null)

    const handleDeleteConfirmation = () =>{
       
        setShowAlert(false)
        deletefolder(deleteParentId, deleteId)
        console.log(deleteParentId)
    }

    const handleAlertModal = (parent, id) => {
        setShowAlert(!showAlert);
        setDeleteId(id);
        setDeleteParentId(parent)
        
    };

    const handleFolderOpen = (id, name) => {
        setParent(id)
        
        let newPath = '/' + name
        
        let temp_path = [...path]

        temp_path.push({id:id, currentPath:newPath});

        setPath(temp_path);

        console.log(path)
    }

    const deletefolder=(parentId, id) =>{

       const updatedFolders = { ...folders };

       delete updatedFolders[id];


       const parentFolder = updatedFolders[parentId];

        if (parentFolder) {
        
        parentFolder.childs = parentFolder.childs.filter((child) => child !== id);
        }

        console.log(updatedFolders)

        setFolders(updatedFolders);
    }

    return (
        <div className="main_container">
        <div className="folderWrapper">
            {Object.keys(folders).map(id =>{
                let thisFolder = folders[id];
                if(thisFolder.parent !== parent)return null;

                return <div className={`folder_content ${thisFolder === folders[id] ? 'selected' : ''}`}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} onClick={() => handleFolderOpen(id, thisFolder.title) }>
                <img src={folderIcon} alt="folder" style={{height:'24px', width:'24px'}}/>
                <h4>{thisFolder.title}</h4>
                </div>
                <img src={deleteIcon} alt="Add" style={{height:"16px", width:"16px", marginLeft:'7rem'}}
                   onClick={()=> handleAlertModal(thisFolder.parent,id)} />
                </div>
            })}

        {showAlert && (
            <div className="alert_modal">  
                    <div className="alert_modal-content">
                            <h4>Are you sure, you want to delete this folder?</h4>
                            <div className="alert_modal_button_group">
                                <button className="cancel_btn" onClick={handleAlertModal}>cancel</button>
                                <button className="create_btn" onClick={handleDeleteConfirmation} >Yes</button>
                            </div>
                    </div>     
         
            </div>
            )}
        </div>
        </div>


    )
}

export default Folders;