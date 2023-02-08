import React, {useState, useEffect} from 'react';
import styles from '../../../styles/Project.module.css'
import StreamTable from './StreamTable';

const Drawing = ({toggleCommentModal}) => {

    const[htmlFileString, setHtmlFileString] = useState();
    const[streamNumbersList, setStreamNumbersList] = useState([]);
    const[displayTable, setDisplayTable] = useState([])

    async function fetchHtml() {
        setHtmlFileString(await ( await fetch('./resources/drawing.html')).text());
    }

    const getElements = () => {
        const identifiers = document.getElementById("PFD").querySelectorAll("div");
        let streamNumbers = findStreamNumbers(identifiers);

        setStreamNumbersList(streamNumbersList.concat(streamNumbers), streamNumberStyling(identifiers))
    }

    const streamNumberStyling = (identifiers) => {
        identifiers.forEach(identifier => {
            if (identifier.textContent.substring(0,2) === "AS") {
                identifier.onmouseover = function(){
                    identifier.style.cursor = 'pointer';
                    identifier.style.scale = '2'
                }
                identifier.onmouseout = function(){
                    identifier.style.cursor = 'pointer';
                    identifier.style.scale = '1'
                }
                identifier.onclick = function() {
                    showTable(identifier)
                }
            }        
        });
    }

    const showTable = (identifier) => {
        setDisplayTable((displayTable) => displayTable.concat(identifier.textContent))
    }
    
    const findStreamNumbers = (identifiers) => {
        let streamNumbers = [];
        identifiers.forEach(identifier => {
            if (identifier.textContent.substring(0,2) === "AS") {
                streamNumbers.push((identifier));
            }        
        });
        return streamNumbers;
    }

    const exitStreamTable = (event) => {
        const removeIndex = displayTable.indexOf(event.target.id)
        if (removeIndex > -1) {
            setDisplayTable(arr => arr.filter((_, index) => index !== removeIndex))
        }
    }

    useEffect(() => {
        fetchHtml()
    }, [])

    useEffect(() => {
        getElements()

    }, [htmlFileString])

    return (
        <div className={styles.main}>
            <div id="PFD" className={styles.PFDWrapper} dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
            {streamNumbersList.map((streamNumber, key) => {
                return (
                    <StreamTable 
                    key={key}
                    exitStreamTable = {exitStreamTable} 
                    streamNumber = {streamNumber} 
                    displayTable = {displayTable} 
                    toggleCommentModal = {toggleCommentModal}
                    />
                )
            })}
        </div>
    )
}

export default Drawing