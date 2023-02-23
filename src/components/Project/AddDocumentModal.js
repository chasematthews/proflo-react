import React, {useEffect, useRef, useState} from 'react';
import styles from '@styles/Project.module.css';
import { getAuth } from 'firebase/auth';
import { getStorage, uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { getFirestore, doc, updateDoc, setDoc } from 'firebase/firestore';
import { httpsCallable, getFunctions } from 'firebase/functions';
import { UserAuth } from '../../contexts/AuthContext';
import CloseIcon from '@mui/icons-material/Close';

const AddDocumentModal = ({document, handleDocumentChange, toggleDocumentModal, modal, team, project, setDocument, documents, setDocuments}) => {

    const pdfUploadRef = useRef();
    const xlsxUploadRef = useRef();
    const idRef = useRef();
    const docNameRef = useRef();
    const docTypeRef = useRef();

    const { userRef } = UserAuth();

    const[pdfUploaded, setPDFUploaded] = useState(false);
    const[pdfName, setPDFName] = useState();
    const[dataUploaded, setDataUploaded] = useState(false);
    const[dataName, setDataName] = useState();
    const[dataSet, setDataSet] = useState()

    const PDFtoHTML = httpsCallable(getFunctions(), 'PDFtoHTML');

    const toggleUploadDialoguePDF = (event) => {
        event.preventDefault();
        pdfUploadRef.current.click();
    }

    const toggleUploadDialogueXLSX = (event) => {
        event.preventDefault();
        xlsxUploadRef.current.click();
    }

    const onPDFFileSelected = async(event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const filePath = `${getAuth().currentUser.uid}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        let publicImageUrl = await getDownloadURL(newImageRef)
        setDocument(document => ({
            ...document, 
            PDFURL: publicImageUrl
        }))
        setPDFName(file.name)
        setPDFUploaded(true)
    }

    const onXLSXFileSelected = async(event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const filePath = `${getAuth().currentUser.uid}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        const XLSXURL = await getDownloadURL(newImageRef);
        setDataSet(dataSet => ({
            ...dataSet, 
            XLSXURL: XLSXURL,
            fileName: file.name
        }))
        setDataName(file.name)
        setDataUploaded(true)
    }

    const handleIDPatternChange = (event) => {
        event.preventDefault();
        setDataSet(dataSet => ({
            ...dataSet, 
            IDReference: idRef.current.value
        }))
    }

    const addDataSet = async (event) => {
        event.preventDefault();
        await setDocument(document => ({
            ...document,
            data: document.data.concat(dataSet)
        }))
        idRef.current.value = '';
        xlsxUploadRef.current.value = '';
        setDataName();
        setDataUploaded(false)
    }

    const submitDocument = async(event) => {
        event.preventDefault()
        toggleDocumentModal()
        await PDFtoHTML({ URL: document.PDFURL }).then(async(result) => {
            await setDocument(document => ({
                ...document,
                drawingURL: result.data,
            }))
            await setDocuments(documents.concat(document))
        })
    }

    const saveDoc = async () => {
        if (team !== null) {
            const teamRef = await doc(getFirestore(), 'teams', `${team.id}`)
            const projectRef = await doc(teamRef, 'projects', `${project.name}`)
            await setDoc(doc(projectRef, 'documents', `${document.documentName}`), {
                documentType: document.documentType,
                documentName: document.documentName,
                PDFURL: document.PDFURL,
                drawingURL: document.drawingURL,
                data: document.data
            });
        } 
        else {
            const projectRef = await doc(userRef, 'projects', `${project.name}`)
            await setDoc(doc(projectRef, 'documents', `${document.documentName}`), {
                documentType: document.documentType,
                documentName: document.documentName,
                PDFURL: document.PDFURL,
                drawingURL: document.drawingURL,
                data: document.data
            });
        }
    }

    useEffect(() => {
        saveDoc(document)
    }, [documents])

    return (
        <>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay}>
                        <CloseIcon onClick={toggleDocumentModal} className={styles.formExitBtn}/>
                        <form className={styles.newDocForm}>
                            <h2 className={styles.formTitle}>Add a Document</h2>
                            <h3>Document Name</h3>
                            <input
                                type='text'
                                name='documentName'
                                value={document.documentName}
                                onChange={(event) => handleDocumentChange(event)}
                                ref={docNameRef}
                            />
                            <h3>Document Type</h3>
                            <input
                                type='text'
                                name='documentType'
                                value={document.documentType}
                                onChange={(event) => handleDocumentChange(event)}
                                ref={docTypeRef}
                            />
                            <button className={styles.addItemBtn} onClick={(event) => toggleUploadDialoguePDF(event)}>
                                <img 
                                    src={require('@images/pdf-logo.png')}
                                    alt={'PDF Logo'}
                                    className={styles.addItemLogo}
                                ></img>{pdfUploaded ? `${pdfName}` : `Add a Drawing`}</button>
                            <input className={styles.addItemInput} ref={pdfUploadRef} onChange={(event) => onPDFFileSelected(event)} type="file" />
                            {document.data.map((data, key) => {
                                return (
                                    <div key={key} className={styles.addDataWrapper}>
                                        <button className={styles.addItemBtn}>
                                            <img
                                                src={require('@images/xlsx-logo.png')}
                                                alt={'XLSX Logo'}
                                                className={styles.addItemLogo}
                                            ></img>${data.fileName}</button>
                                        <h2 className={styles.addStringHeading}>{data.IDReference}</h2>
                                    </div>
                                )
                            })}
                            <div className={styles.addDataWrapper}>
                                <button className={styles.addItemBtn} onClick={(event) => toggleUploadDialogueXLSX(event)}>
                                    <img
                                        src={require('@images/xlsx-logo.png')}
                                        alt={'XLSX Logo'}
                                        className={styles.addItemLogo}
                                    ></img>{dataUploaded ? `${dataName}` : `Add Data`}</button>
                                <input className={styles.addItemInput} ref={xlsxUploadRef} onChange={(event) => onXLSXFileSelected(event)} type="file" />
                                <div>
                                    <h2 className={styles.addStringHeading}>Add the reference string</h2>
                                    <div className={styles.addStringWrapper}>
                                        <input ref={idRef} type="text" className={styles.addStringInput} onChange={(event) => handleIDPatternChange(event)}/>
                                        <button onClick={event => addDataSet(event)} className={styles.addStringBtn}>OK</button>
                                    </div>
                                </div>
                            </div>
                            <button 
                                className={styles.newProjectBtn}
                                onClick={submitDocument}
                            >Add Document</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddDocumentModal