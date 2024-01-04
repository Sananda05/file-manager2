import { v4 as uuidv4 } from 'uuid';

import { useState, useRef } from 'react';
import Folders from './Folders';

import addIcon from '../assets/icon/plus.png'

import './FileManager.css'


function FileManager(){
        const [parent, setParent] = useState(0);

        const [path, setPath] = useState("main")

        const [folders, setFolders] = useState({
            id1: {title: 'Folder 1', parent: 0, childs:['id4', 'id5']},
            id2: {title: 'Folder 2', parent: 0, childs:['id3']},
            id3: {title: 'Folder 2.1', parent: 'id2', childs:[]},
            id4: {title: 'Folder 1.1', parent: 'id1', childs:[]},
            id5: {title: 'Folder 1.2', parent: 'id1', childs:[]},
        })

      const [isOpen, setIsOpen] = useState(false)
      
      const folderNameRef = useRef("")

      const handleModalOpener = (e)=>{

        setIsOpen(!isOpen)

      }
      
      const handleAddNewFolder = (e) =>{

        e.preventDefault();

        const newFolderId = `id${Object.keys(folders).length + 1}`;
        const newFolder = {title: folderNameRef.current.value , parent: parent, childs: [] };

  
        setFolders((prevFolders) => ({
        ...prevFolders,
        [newFolderId]: newFolder,
        }));

        folderNameRef.current.value =""

      }


      return (
        <div className='main_container' >
            <div className="add_button" onClick={handleModalOpener}>
                <img src={addIcon} alt="Add" style={{height:"16px", width:"16px"}} />
                <p style={{fontSize:"14px"}}>Add New Folder</p>
                
            </div>
            <div className='file_path'>{path}</div>
            <Folders parent={parent} folders={folders} setFolders={setFolders} setParent={setParent} path={path} setPath={setPath}/>


            {isOpen ? 
            <div className="modal_container">
                <div className={`modal ${isOpen ? 'open' : ''}`}>          
                    <div className="modal-content">
            
                        <form onSubmit={handleAddNewFolder}>  
                            <input type="text" placeholder="Folder Name" id="folder_name" name="name" ref={folderNameRef} />
                            <div className="modal_button_group">
                                <button className="cancel_btn" onClick={handleModalOpener}>cancel</button>
                                <button className="create_btn" type="submit">create</button>
                            </div>
                         </form>
                    </div>
                 </div>
            </div>
        : 
        <div></div>
        }
        </div>
      );

}

export default FileManager;