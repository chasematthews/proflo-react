import React, {useState, useEffect, useRef} from 'react';
import styles from '../../../styles/Project.module.css'
import StreamTable from './StreamTable';

const Drawing = ({toggleCommentModal, project, team, appDocument}) => {
    
    const[htmlFileString, setHtmlFileString] = useState();
    const[streamNumbersList, setStreamNumbersList] = useState([]);
    const[streamNumbers, setStreamNumbers] = useState([])
    const[displayTable, setDisplayTable] = useState([]);

    // streamNumbersList && streamNumbersList.map(streamNumber => {
    //     return (console.log(streamNumber.textContent))
    // })

    async function fetchHtml() {
        setHtmlFileString(await ( await fetch(`${appDocument.drawingURL}`)).text());
    }

    const getElements = () => {
        const identifiers = document.getElementById("PFD").querySelectorAll("div");

        appDocument.data.map((dataSet) => {
            findStreamNumbers(identifiers, dataSet.IDReference).then(result => {
                result.length !== 0 && setStreamNumbersList(streamNumbersList => [...streamNumbersList, result])
            });
            streamNumberStyling(identifiers, dataSet.IDReference)
        })     
    }

    const streamNumberStyling = (identifiers, stringRef) => {

        let regexString = "";

        for (let i = 0; i < stringRef.length; i++) {
            let char = stringRef.charAt(i);
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
    
    const findStreamNumbers = (identifiers, stringRef) => {

        let regexString = "";

        for (let i = 0; i < stringRef.length; i++) {
            let char = stringRef.charAt(i);
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

        return new Promise((resolve, reject) => resolve(streamNumbers));
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
                {streamNumbersList !== undefined && streamNumbersList.map((idArray, string) => {
                    return (
                        idArray.map(streamNumber => {
                            return (
                                // <div>Hello</div>
                                <StreamTable
                                key={streamNumber.textContent}
                                exitStreamTable = {exitStreamTable}
                                streamNumber = {streamNumber}
                                displayTable = {displayTable}
                                toggleCommentModal = {toggleCommentModal}
                                dataURL = {appDocument.data[string].XLSXURL}
                                />
                            )
                        })
                    )
                })}
            </div>
        </div>
    )
}

export default Drawing