import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import React, {useState, useEffect, useRef} from 'react';
import styles from '../../../styles/Project.module.css'
import StreamTable from './StreamTable';

const Drawing = ({toggleCommentModal, appDocument, initiateComment, setActiveDocument, team, project, streamNumbersList, setStreamNumbersList, activeStreamNumbersList, setActiveStreamNumbersList, streamNumbersListText, setStreamNumbersListText}) => {
    
    const[htmlFileString, setHtmlFileString] = useState();
    const[displayTable, setDisplayTable] = useState([]);
    const[dataArray, setDataArray] = useState([]);

    useEffect(() => {
        applyStyling()
    }, [streamNumbersListText])

    async function fetchHtml() {
        setHtmlFileString(await ( await fetch(`${appDocument.drawingURL}`)).text());
    }

    const applyStyling = () => {
        const identifiers = document.getElementById("PFD").querySelectorAll("div");
        appDocument.data.map(dataSet => {
            streamNumberStyling(identifiers, dataSet.IDReference)
        })
    }

    const getElements = () => {
        const identifiers = document.getElementById("PFD").querySelectorAll("div");

        appDocument.data.map((dataSet) => {
            findStreamNumbers(identifiers, dataSet.IDReference).then(result => {
                result.length !== 0 && setStreamNumbersList(streamNumbersList => [...streamNumbersList, result])
                getSNText(result).then(streamTextArray => {
                    streamTextArray.length !==0 && setStreamNumbersListText(streamNumbersListText => [...streamNumbersListText, streamTextArray])
                })
            });
        })     
    }

    const getSNText = (streamArray) => {
        let streamTextArray = []
        streamArray.map(streamID => streamTextArray.push(streamID.textContent))
        return new Promise((resolve, reject) => resolve(streamTextArray));
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

        // setDisplayTable((displayTable) => displayTable.concat(span.textContent))
        streamNumbersListText.map(async(streamNumberSet, i) => {
            const index = await streamNumberSet.indexOf(span.textContent)
            if (index !== -1) {
                setActiveStreamNumbersList(activeStreamNumberList => [...activeStreamNumberList, streamNumbersList[i][index]])
            }
        })
    }

    useEffect(() => {
        if (activeStreamNumbersList !== undefined) {
            if (activeStreamNumbersList.length > 0) {
                if (activeStreamNumbersList.length !== [...new Set(activeStreamNumbersList)].length) {
                    setActiveStreamNumbersList([...new Set(activeStreamNumbersList)])
                }
            }
        }
        setDataArray([])
    }, [activeStreamNumbersList])

    useEffect(() => {
        if (dataArray.length === 0 && activeStreamNumbersList.length !== 0) {
            activeStreamNumbersList.map(async(streamNumber) => {
                const dataSet = await getDataIndex(streamNumber)
                if (dataArray.length === 0) {
                    setDataArray(dataArray => [...dataArray, dataSet])
                }
            })
        }
    }, [dataArray])
    
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

    const loadImages = async() => {
        const teamDB = await doc(getFirestore(), 'teams', `${team.id}`)
        const projectDB = await doc(teamDB, 'projects', `${project.name}`)
        const imageURL = await (await getDoc(doc(projectDB, 'documents', `${appDocument.documentName}`))).data().screenGrab
        if (imageURL === undefined) {
            exportAsImage();
        }
    }

    const exportAsImage = async() => {
        const element = document.getElementById('previewImage');
        const canvas = await html2canvas(element);
        const image = await canvas.toDataURL('image/png', 1.0)
        saveImage(image)
        console.log(image)
    }

    const saveImage = async(image) => {
        const teamDB = await doc(getFirestore(), 'teams', `${team.id}`)
        const projectDB = await doc(teamDB, 'projects', `${project.name}`)
        await updateDoc(doc(projectDB, 'documents', `${appDocument.documentName}`), {
            screenGrab: image
        })
    }

    const getDataIndex = async (streamNumber) => {
        const dataIndex = await streamNumbersListText.map((streamNumberSet, i) => {
            const index = streamNumberSet.indexOf(streamNumber.textContent)
            if (index !== -1) {
                return i
            } 
        })
        return await dataIndex.filter(function(element) {return element !== undefined})[0]
    }

    // useEffect(() => {
    //     setTimeout(() => loadImages(), 1000)
    // })


    useEffect(() => {
        fetchHtml()
    }, [appDocument.drawingURL])

    useEffect(() => {
        getElements()
    }, [htmlFileString])
    
    return (
        <div className={styles.main}>
            <h2>{document.documentName}</h2>
            <div className={styles.PFDWrapper} id='previewImage'>
                <div id="PFD" className={styles.PFD} dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
                {(activeStreamNumbersList.length !== 0 && activeStreamNumbersList.length == dataArray.length) && activeStreamNumbersList.map((streamNumber, key) => {
                    console.log(dataArray[key])
                    return (
                        <StreamTable
                            streamNumber={streamNumber}
                            key={key}
                            toggleCommentModal = {toggleCommentModal}
                            dataURL = {appDocument.data[dataArray[key]].XLSXURL}
                            initiateComment = {initiateComment}
                        />





                        // idArray.map(streamNumber => {
                        //     return (
                        //         // <div>Hello</div>
                        //         <StreamTable
                        //         key={streamNumber.className}
                        //         exitStreamTable = {exitStreamTable}
                        //         streamNumber = {streamNumber}
                        //         displayTable = {displayTable}
                        //         toggleCommentModal = {toggleCommentModal}
                        //         dataURL = {appDocument.data[0].XLSXURL}
                        //         initiateComment = {initiateComment}
                        //         />
                        //     )
                        // })
                    )
                })}
            </div>
        </div>
    )
}

export default Drawing