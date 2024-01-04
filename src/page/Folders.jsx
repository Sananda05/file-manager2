import React from "react";
import { useState } from "react";

import {Alert} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import folderIcon from '../assets/icon/folder.png'
import deleteIcon from '../assets/icon/remove.png'

import './Folders.css'

const Folders  = ({parent, folders, setFolders, setParent}) =>{

    const [showAlert, setShowAlert] = useState(false);

    const [deleteId, setDeleteId] = useState(null)

    const handleDeleteConfirmation = () =>{
       
        setShowAlert(false)
        deletefolder(deleteId)
    }

    const handleAlertModal = (id) => {
        setShowAlert(!showAlert);
        setDeleteId(id)
    };

    const deletefolder=(id) =>{

       const updatedFolders = { ...folders };

        // Delete the specified folder by its ID
        delete updatedFolders[id];

        // Update the state with the modified folders
        setFolders(updatedFolders);
    }

    return (
        <div className="main_container">
        <div className="folderWrapper">
            {Object.keys(folders).map(id =>{
                let thisFolder = folders[id];
                if(thisFolder.parent !== parent)return null;

                return <div className={`folder_content ${thisFolder === folders[id] ? 'selected' : ''}`}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} onClick={() => { setParent(id)}}>
                <img src={folderIcon} alt="folder" style={{height:'24px', width:'24px'}}/>
                <h4>{thisFolder.title}</h4>
                </div>
                <img src={deleteIcon} alt="Add" style={{height:"16px", width:"16px", marginLeft:'7rem'}}
                   onClick={()=> handleAlertModal(id)} />
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