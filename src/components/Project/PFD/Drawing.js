import React, {useState, useEffect, useRef} from 'react';
import styles from '../../../styles/Project.module.css'
import StreamTable from './StreamTable';
import { getFunctions, httpsCallable } from 'firebase/functions'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { UserAuth } from '../../../contexts/AuthContext';
import { updateDoc, doc, query, onSnapshot } from 'firebase/firestore';

const Drawing = ({toggleCommentModal, project}) => {

    const[htmlFileString, setHtmlFileString] = useState();
    const[streamNumbersList, setStreamNumbersList] = useState([]);
    const[displayTable, setDisplayTable] = useState([]);
    const[drawingURL, setDrawingURL] = useState();
    const[dataURL, setDataURL] = useState();
    const[IDPattern, setIDPattern] = useState();

    const { userRef } = UserAuth();
    // const { companyRef } = UserAuth();

    const pdfUploadRef = useRef();
    const xlsxUploadRef = useRef();
    const idRef = useRef();

    const PDFtoHTML = httpsCallable(getFunctions(), 'PDFtoHTML');

    async function fetchHtml() {
        setHtmlFileString(await ( await fetch(`${drawingURL}`)).text());
    }

    const getElements = () => {
        const identifiers = document.getElementById("PFD").querySelectorAll("div");
        let streamNumbers = findStreamNumbers(identifiers);

        setStreamNumbersList(streamNumbersList.concat(streamNumbers), streamNumberStyling(identifiers))
    }

    const streamNumberStyling = (identifiers) => {

        let regexString = "";

        for (let i = 0; i < IDPattern.length; i++) {
            let char = IDPattern.charAt(i);
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
                let indexEnd = indexStart + IDPattern.length
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

        for (let i = 0; i < IDPattern.length; i++) {
            let char = IDPattern.charAt(i);
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

    const onPDFFileSelected = async(event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const filePath = `${getAuth().currentUser.uid}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        let publicImageUrl = await getDownloadURL(newImageRef)
        PDFtoHTML({ URL: publicImageUrl }).then(result => saveURL(result.data))
        savePDFURL(publicImageUrl)
    }

    const onXLSXFileSelected = async(event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const filePath = `${getAuth().currentUser.uid}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        const XLSXURL = await getDownloadURL(newImageRef);
        saveXLSX(XLSXURL)
    }

    const toggleUploadDialoguePDF = (event) => {
        event.preventDefault();
        pdfUploadRef.current.click();
    }

    const toggleUploadDialogueXLSX = (event) => {
        event.preventDefault();
        xlsxUploadRef.current.click();
    }

    const savePDFURL = async(PDFURL) => {
        try {
            await updateDoc(doc(userRef, 'projects', `${project.name}`), {
                PDFURL: PDFURL,
            });
        }
        catch(error) {
            console.log('Error writing logo information to Firebase Database');
        }
    }

    const saveURL = async(drawingURL) => {
        try {
            await updateDoc(doc(userRef, 'projects', `${project.name}`), {
                drawingURL: drawingURL,
            });
        }
        catch(error) {
            console.log('Error writing logo information to Firebase Database');
        }
    }

    const saveXLSX = async(XLSXURL) => {
        try {
            await updateDoc(doc(userRef, 'projects', `${project.name}`), {
                XLSXURL: XLSXURL,
            });
        }
        catch(error) {
            console.log('Error writing logo information to Firebase Database');
        }
    }

    const addIDPattern = (event) => {
        event.preventDefault();
        saveIDPattern(idRef);
    }

    const saveIDPattern = async(idRef) => {
        try {
            await updateDoc(doc(userRef, 'projects', `${project.name}`), {
                IDReference: idRef.current.value,
            });
        }
        catch(error) {
            console.log('Error writing company name to Firebase Database');
        }
    }

    const loadDrawingURL = () => {
        const recentMessagesQuery = query(doc(userRef, 'projects', `${project.name}`))

        onSnapshot(recentMessagesQuery, (snapshot) => {
            snapshot.data() && setDrawingURL((snapshot.data().drawingURL));
        })
    }

    const loadDataURL = () => {
        const recentMessagesQuery = query(doc(userRef, 'projects', `${project.name}`))

        onSnapshot(recentMessagesQuery, (snapshot) => {
            snapshot.data() && setDataURL((snapshot.data().XLSXURL));
        })
    }

    const loadIDPattern = () => {
        const recentMessagesQuery = query(doc(userRef, 'projects', `${project.name}`))

        onSnapshot(recentMessagesQuery, (snapshot) => {
            snapshot.data() && setIDPattern((snapshot.data().IDReference));
        })
    }

    useEffect(() => {
        if(drawingURL && dataURL) {
            fetchHtml()
        }
    }, [drawingURL])

    useEffect(() => {
        if(drawingURL && dataURL) {
            getElements()
        }
    }, [htmlFileString, drawingURL])

    useEffect(() => {
        loadDrawingURL();
        loadDataURL();
        loadIDPattern();
    }, [])
    

    return (
        <div className={styles.main}>
            <h2>Process Flow Diagram</h2>
            {drawingURL && dataURL ? 
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
                            dataURL = {dataURL}
                            />
                        )
                    })}
                </div> :
                <div className={styles.documentUploadBox}>
                    <form className={styles.documentUploadForm}>
                        <button className={styles.addItemBtn} onClick={(event) => toggleUploadDialoguePDF(event)}>
                            <img 
                                src={require('./../../../images/pdf-logo.png')}
                                alt={'PDF Logo'}
                                className={styles.addItemLogo}
                            ></img>Add a Drawing</button>
                        <input className={styles.addItemInput} ref={pdfUploadRef} onChange={(event) => onPDFFileSelected(event)} type="file" />
                        <button className={styles.addItemBtn} onClick={(event) => toggleUploadDialogueXLSX(event)}>
                            <img 
                                src={require('./../../../images/xlsx-logo.png')}
                                alt={'XLSX Logo'}
                                className={styles.addItemLogo}
                            ></img>Add Data</button>
                        <input className={styles.addItemInput} ref={xlsxUploadRef} onChange={(event) => onXLSXFileSelected(event)} type="file" />
                        <input ref={idRef} type="text" />
                        <button onClick={event => addIDPattern(event)}>OK</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Drawing