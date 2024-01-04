import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';
import Folder from './Folder';


function FileManager(){

    const randomId = uuidv4();

    const [selectedFolder, setselectedFolder] = useState('');
    const [filteredData, setFilteredData] = useState([])

    const data = [
        {
            id: 1,
            name:'Folder 1',
            parent:0,
            child:[{
                id:2,
                name:'Folder2',
                parent: 1,
                child:[{
                    id:3,
                    parent: 2,
                    name:'Folder3',
                    child:[]  }]
                }]
        },
        {  
            id:4,
            name:'Folder 3',
            parent:0,
            child:[]

        }
        
    ]

    const handleSelectFolder = (folderID) => {

        for(let i=0; i< data.length; i++)
        {
            if(data[i].id === folderID){
                console.log(data[i])
                setFilteredData(data[i])
            }
        }


    }  
    
      return (
        <div>

        {filteredData.length > 0 ? <></> : 

           data.map((item) => (
            item.parent === 0 ?
    
                <li key={item.id} style={{cursor:'pointer'}} onClick={() => handleSelectFolder(item.id)}>
                    {item.name}
                </li> : 
                <></>
            ))
          
        }
          {filteredData? 
        //    <Folder filteredData={filteredData} />
          <div>
            {filteredData?
           
                filteredData.child?.map((subfolder) => (
                    <div>
                        {subfolder.name}
                    </div>
                    
                ))

            : ""}
          </div>

           : <></>}
          
        </div>
      );

}

export default FileManager;