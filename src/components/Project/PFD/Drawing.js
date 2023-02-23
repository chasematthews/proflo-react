import React, {useState, useEffect, useRef} from 'react';
import styles from '../../../styles/Project.module.css'
import StreamTable from './StreamTable';
import { getFunctions, httpsCallable } from 'firebase/functions'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { UserAuth } from '../../../contexts/AuthContext';
import { updateDoc, doc, query, onSnapshot, getFirestore } from 'firebase/firestore';

const Drawing = ({toggleCommentModal, project, team, appDocument}) => {

    console.log(appDocument.drawingURL)
    
    const[htmlFileString, setHtmlFileString] = useState();
    const[streamNumbersList, setStreamNumbersList] = useState([]);
    const[displayTable, setDisplayTable] = useState([]);

    async function fetchHtml() {
        setHtmlFileString(await ( await fetch(`${appDocument.drawingURL}`)).text());
    }

    const getElements = () => {
        const identifiers = document.getElementById("PFD").querySelectorAll("div");
        let streamNumbers = findStreamNumbers(identifiers);

        setStreamNumbersList(streamNumbersList.concat(streamNumbers), streamNumberStyling(identifiers))
    }

    const streamNumberStyling = (identifiers) => {

        let regexString = "";

        for (let i = 0; i < appDocument.data[0].IDReference.length; i++) {
            let char = appDocument.data[0].IDReference.charAt(i);
            if (char === "^") {
                regexString += "\\d"
            } else if (char === "*") {
                regexString += "\\w"
            } else {
                regexString += char
            }
        }

        const regex = new RegExp(regexString)

        identifiers.forEach(identifier => {
            if (identifier.textContent.match(regex) && identifier.className[0] === "t") {
                let indexStart = identifier.textContent.match(regex).index;
                let indexEnd = indexStart + appDocument.data[0].IDReference.length
                let string = identifier.textContent
                let pre = string.substring(0, indexStart)
                let phrase = string.substring(indexStart, indexEnd)
                let post = string.substring(indexEnd, string.length)
                string = pre + `<span>${phrase}</span>` + [post]
                identifier.innerHTML = string;

                const span = identifier.querySelector("span")

                span.onmouseover = function(){
                    span.style.cursor = 'pointer';
                    span.style.scale = '2'
                }
                span.onmouseout = function(){
                    span.style.cursor = 'pointer';
                    span.style.scale = '1'
                }
                span.onclick = function() {
                    showTable(span)
                }
            }        
        });
    }

    const showTable = (span) => {
        setDisplayTable((displayTable) => displayTable.concat(span.textContent))
    }
    
    const findStreamNumbers = (identifiers) => {

        let regexString = "";

        for (let i = 0; i < appDocument.data[0].IDReference.length; i++) {
            let char = appDocument.data[0].IDReference.charAt(i);
            if (char === "^") {
                regexString += "\\d"
            } else if (char === "*") {
                regexString += "\\w"
            } else {
                regexString += char
            }
        }

        const regex = new RegExp(regexString)

        let streamNumbers = [];
        identifiers.forEach(identifier => {
            if (identifier.textContent.match(regex) && identifier.className[0] === "t") {
                if (regex.test(identifier.textContent)) {
                    streamNumbers.push((identifier));
                }    
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
    }, [appDocument.drawingURL])

    useEffect(() => {
        getElements()
    }, [htmlFileString])
    

    return (
        <div className={styles.main}>
            <h2>{document.documentName}</h2>
            <div className={styles.PFDWrapper}>
                <div id="PFD" className={styles.PFD} dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
                {streamNumbersList.map((streamNumber, key) => {
                    return (
                        <StreamTable
                        key={key}
                        exitStreamTable = {exitStreamTable}
                        streamNumber = {streamNumber}
                        displayTable = {displayTable}
                        toggleCommentModal = {toggleCommentModal}
                        dataURL = {appDocument.data[0].XLSXURL}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Drawing