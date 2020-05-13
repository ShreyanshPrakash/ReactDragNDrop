import React, { useState } from 'react';

import './list.style.css';

import {
    users,
} from '../config/demo';


function ListComponent() {

    const [dragStartClass, setDragStartClass] = useState("");
    const [userData, setUserData] = useState(users);
    const [dragEnterIndex, setDragEnterIndex] = useState(0);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);

    const handleDragStart = (event, index) => {
        // event.persist();
        setDragStartClass('drag');
        setSelectedRowIndex(index);
        // event.dataTransfer.dropEffect = "copy";
        // event.target.style.display = 'block';
        // event.dataTransfer.setDragImage(event.target, 0, 0);
        // setTimeout(() => {
        //     console.log( event.target )
        //     event.target.style.display = "block";
        //     event.target.style.color = "blue";  // will make changes to the seldcted row
        // },0)
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    const handleDrop = (event) => {
        event.preventDefault();
        if( selectedRowIndex !== dragEnterIndex ){
            let userDataCopy = Array.from(userData);
            let selectedRow = userDataCopy.splice(selectedRowIndex,1);
            userDataCopy.splice(dragEnterIndex,0,...selectedRow);
            setUserData( userDataCopy );
        }
    }

    const handleItemDragEnter = ( event, index ) => {
        event.preventDefault();
        event.target.style.backgroundColor = "grey";
        return true;
    }

    const handleItemDragLeave = ( event, index ) => {
        event.preventDefault();
        event.target.style.backgroundColor = "white";
        return true;
    }

    return (
        <React.Fragment>
            <div className="flexWrapper">
                <div className="listWrapper">
                    <ul
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {
                            userData.map((user, index) => (
                                <div key={index}
                                    className={`list ${dragStartClass}`}
                                    draggable="true"
                                    onDragStart={ (event) => handleDragStart(event, index)}
                                    onDragEnter={(event) => setDragEnterIndex(index)}
                                    // onDragEnter={handleItemDragEnter} // make syle background changes
                                    // onDragLeave={handleItemDragLeave}
                                >
                                    {/* <li>{user.name}</li> */}
                                    {user.name}
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}


export {
    ListComponent,
}