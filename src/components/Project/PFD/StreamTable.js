import React from 'react';
import StreamTableInfo from './StreamTableInfo';

const StreamTable = ({ streamNumber, displayTable }) => {

    let showTable = displayTable.includes(streamNumber.textContent)

    let position = streamNumber.getBoundingClientRect()

    let styling = {
        left: `${position.left + position.width}px`,
        top: `${position.top + position.height}px`,
        zIndex: '1',
        height: '500px',
        width: '50px',
        backgroundColor: 'white',
        position: 'fixed',
        display: `${showTable? "flex" : "none"}`,
    }

    return (
        <div style={styling}>
            <StreamTableInfo streamNumber = {streamNumber}/>
        </div>
    )
}



export default StreamTable