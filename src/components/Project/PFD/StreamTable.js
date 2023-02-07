import React from 'react';

const StreamTable = ({ streamNumber, displayTable }) => {

    let showTable = displayTable.includes(streamNumber.textContent)
    console.log(displayTable.includes(streamNumber.textContent))

    let position = streamNumber.getBoundingClientRect()

    let styling = {
        left: `${position.left + position.width}px`,
        top: `${position.top + position.height}px`,
        zIndex: '1',
        height: '20px',
        width: '20px',
        backgroundColor: 'white',
        position: 'fixed',
        display: `${showTable? "flex" : "none"}`,
    }

    return (
        <div style={styling}>
            Stream Number
        </div>
    )
}



export default StreamTable