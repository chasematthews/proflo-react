import React from 'react';
import StreamTableInfo from './StreamTableInfo';
import CloseIcon from '@mui/icons-material/Close';
import styles from './../../../styles/Project.module.css'


const StreamTable = ({ streamNumber, displayTable, exitStreamTable }) => {

    console.log(displayTable)

    let showTable = displayTable.includes(streamNumber.textContent)

    let position = streamNumber.getBoundingClientRect()

    let styling = {
        left: `${position.left + position.width}px`,
        top: `${position.top + position.height}px`,
        zIndex: '1',
        backgroundColor: '#d4f3e1',
        position: 'fixed',
        display: `${showTable? "flex" : "none"}`,
        overflow: 'auto',
        resize: 'both',
        flexDirection: 'column',
        border: 'solid 1px #4dffc9',
        borderRadiues: '8px',
        boxShadow: 'rgba(0,0,0,1) 0px 1px 4px'
    }

    return (
        <div style={styling}>
            <CloseIcon id={streamNumber.textContent} onClick={exitStreamTable} className={styles.streamTableExitBtn}/>
            <StreamTableInfo streamNumber = {streamNumber}/>
        </div>
    )
}



export default StreamTable