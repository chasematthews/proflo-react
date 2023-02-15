import React, {useState, useEffect, useRef} from 'react';
import styles from '../../../styles/Project.module.css'
import StreamTable from './StreamTable';
import { getFunctions, httpsCallable } from 'firebase/functions'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { UserAuth } from '../../../contexts/AuthContext';
import { updateDoc, doc, query, onSnapshot } from 'firebase/firestore';

const Drawing = ({toggleCommentModal, project}) => {

    const[htmlFileString, setHtmlFileString] = useState();
    const[streamNumbersList, setStreamNumbersList] = useState([]);
    const[displayTable, setDisplayTable] = useState([]);
    const[drawingURL, setDrawingURL] = useState();

    console.log(drawingURL)

    const { userRef } = UserAuth();

    const buttonUploadRef = useRef()

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

    const onMediaFileSelected = async(event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const filePath = `${getAuth().currentUser.uid}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        const publicImageUrl = await getDownloadURL(newImageRef)
        PDFtoHTML({ URL: publicImageUrl }).then(result => saveURL(result.data))
    }

    const toggleUploadDialogue = (event) => {
        event.preventDefault();
        buttonUploadRef.current.click();
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

    const loadURL = () => {
        const recentMessagesQuery = query(doc(userRef, 'projects', `${project.name}`))

        onSnapshot(recentMessagesQuery, (snapshot) => {
            snapshot.data() && setDrawingURL((snapshot.data().drawingURL));
        })
    }

    useEffect(() => {
        if(drawingURL) {
            fetchHtml()
        }
    }, [drawingURL])

    useEffect(() => {
        if(drawingURL) {
            getElements()
        }
    }, [htmlFileString, drawingURL])

    useEffect(() => {
        loadURL();
    }, [])
    

    return (
        <div className={styles.main}>
            <h2>Process Flow Diagram</h2>
            {drawingURL ? 
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
                            />
                        )
                    })}
                </div> :
                <div>
                    <button onClick={(event) => toggleUploadDialogue(event)}>Add a Logo</button>
                    <input ref={buttonUploadRef} onChange={(event) => onMediaFileSelected(event)} type="file" />
                </div>
            }
        </div>
    )
}

export default Drawing