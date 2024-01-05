import React from "react";
import { useState } from "react";

import folderIcon from '../assets/icon/folder.png'
import deleteIcon from '../assets/icon/remove.png'
import optionIcon from '../assets/icon/options.png'

import './Folders.css'
// import AlertModal from "../component/navbar/AlertModal";

const Folders  = ({parent, folders, setFolders, setParent, path, setPath}) =>{

    const [showAlert, setShowAlert] = useState(false);
    const [optionModal, setOptionModal] = useState(false)

    const [selectedId, setselectedId] = useState(null)
    const [deleteParentId, setDeleteParentId] = useState(null)

    const colorList = ['#f67f90', 'green', 'yellow','purple']

    const [color, setcolor] = useState(['#dae6f5'])

    const handleFolderColor = (color) =>{
        setcolor(color)
    }

    const handleOptionModal = (parent, id) => {
        setOptionModal(!optionModal);
        setselectedId(id);
        setDeleteParentId(parent)
    }

    const handleDeleteConfirmation = () =>{
       
        setShowAlert(false)
        deletefolder(deleteParentId, selectedId)
        console.log(deleteParentId)
    }

    const handleAlertModal = () => {
        setShowAlert(!showAlert);
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
        setFolders(updatedFolders);
    }

    return (
        <div className="main_container">
        <div className="folderWrapper">
            {Object.keys(folders).map(id =>{
                let thisFolder = folders[id];
                
                if(thisFolder.parent !== parent)return null;
                

                console.log("folder ID", id)
                console.log(selectedId)

                return <div className={`folder_content `} style={{backgroundColor: selectedId === id ? color : '#dae6f5'}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} onClick={() => handleFolderOpen(id, thisFolder.title) }>
                <img src={folderIcon} alt="folder" style={{height:'24px', width:'24px'}}/>
                <h4>{thisFolder.title}</h4>
                </div>
                <img src={optionIcon} alt="Add" style={{height:"16px", width:"16px", marginLeft:'7rem'}}
                   onClick={()=> handleOptionModal(thisFolder.parent,id)} />
                </div>
            })}

        {optionModal && (

        <div className="option_modal">  
            <div className="option_modal-content">
                <div className="color_option">
                    <p style={{paddingLeft:'10px'}}> Change Color</p>
                    <div>
                        <p style={{fontSize:'10px', color:'gray'}}>Pick color</p>
                        <div style={{display:'flex', flexDirection:'row'}}>
                        {colorList.map((color, index) => (
                            <div
                                key={index}
                                style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: color,
                                margin: '10px',
                                cursor:'pointer'
                                }}

                                onClick={() => handleFolderColor(color)}
                            ></div>
                            ))}
                            
                        </div> 
                    </div>
                 </div>  
                   <div style={{width:'100%', height:'1px', backgroundColor:'gray'}}></div>
                    <div >
                        <p style={{fontSize:'14px', height:'35px', width:'200px', borderRadius:'5px', backgroundColor:'#f0dcdc', paddingTop:'12px', cursor:'pointer'}} 
                        onClick={handleAlertModal}>Move to trash</p>
                    </div>
                    
            </div>     

        </div>

        )}

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