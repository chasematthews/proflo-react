import React, {useState, useEffect} from 'react';
import styles from '../../../styles/Project.module.css'
import StreamTable from './StreamTable';

const Drawing = () => {
    const[htmlFileString, setHtmlFileString] = useState();
    const[streamNumbersList, setStreamNumbersList] = useState([]);

    async function fetchHtml() {
        setHtmlFileString(await ( await fetch('./resources/drawing.html')).text());
    }

    const getElements = () => {
        const identifiers = document.getElementById("PFD").querySelectorAll("div");
        let streamNumbers = findStreamNumbers(identifiers);
        setStreamNumbersList(streamNumbersList.concat(streamNumbers));
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

    useEffect(() => {
        fetchHtml()
    }, [])

    useEffect(() => {
        getElements();
    }, [htmlFileString])

    return (
        <div className={styles.main}>
            <div id="PFD" className={styles.PFDWrapper} dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
            {streamNumbersList.map((streamNumber) => {
                return (
                    <StreamTable
                        streamNumber = {streamNumber}
                    />
                )
            })}
        </div>
    )
}

export default Drawing