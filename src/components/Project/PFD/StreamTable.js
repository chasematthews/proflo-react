import React, {useState} from 'react';
import StreamTableInfo from './StreamTableInfo';
import CloseIcon from '@mui/icons-material/Close';
import styles from './../../../styles/Project.module.css'


const StreamTable = ({ streamNumberDiv, streamNumber, displayTable, exitStreamTable, toggleCommentModal, dataURL, initiateComment }) => {

    // const span = streamNumber.querySelector("span")

    let position = streamNumberDiv.getBoundingClientRect()

    const clientHeight = streamNumberDiv.parentNode.parentNode.parentNode.clientHeight

    const [positionLeft, setPositionLeft] = useState(position.left + position.width);
    const [positionTop, setPositionTop] = useState((position.top + position.height) - Math.floor((position.top + position.height)/clientHeight)*clientHeight);

    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    const dragMouseDown = (event) => {
        event = event || window.event;
        event.preventDefault();
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    const elementDrag = (event) => {
        event = event || window.event;
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        setPositionLeft(event.pageX - pos1);
        setPositionTop(event.pageY - pos2);
    }

    const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    let styling = {
        left: `${positionLeft}px`,
        top: `${positionTop}px`,
        zIndex: '1',
        backgroundColor: '#d4f3e1',
        position: 'fixed',
        display: "flex",
        overflow: 'auto',
        resize: 'both',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'solid 1px #4dffc9',
        borderRadiues: '8px',
        boxShadow: 'rgba(0,0,0,1) 0px 1px 4px'
    }

    return (
        <div style={styling}>
            <div onMouseDown = {dragMouseDown} className={styles.streamInfoHeader}>
                <CloseIcon id={streamNumber.textContent} onClick={event => exitStreamTable(event)} className={styles.streamTableExitBtn}/>
            </div>
            <StreamTableInfo streamNumber = {streamNumber} dataURL={dataURL}/>
            <button id={streamNumber.textContent} className={styles.addCommentButton} onClick={initiateComment}>Add Comment</button>
        </div>
    )
}

export default StreamTable