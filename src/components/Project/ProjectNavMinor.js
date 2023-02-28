import React from 'react'
import SidebarRow from '../Home/SidebarRow';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../styles/Project.module.css';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, getFirestore, deleteDoc } from 'firebase/firestore';
import { UserAuth } from '../../contexts/AuthContext';

const ProjectNavMinor = ({toggleDocumentModal, documents, setDocuments, team, project, setStreamNumbersList, setActiveStreamNumbersList, setStreamNumbersListText}) => {

    const { userRef } = UserAuth();

    const navigate = useNavigate();

    const sidebarStyle = styles.sidebarRowMinor

    const designButtonsContent = [
        {icon: AddIcon, text: 'Add Doc', id: 'Add Doc', handleClick: toggleDocumentModal}
    ]

    const deleteDocument = (docName) => {
        setDocuments(documents => documents.filter(document => document.documentName !== `${docName}`))
        deleteFromDB(docName)
    }

    const deleteFromDB = async (docName) => {
        if (team === null) {
            const projectDB = await doc(userRef, 'projects', `${project.name}`)
            await deleteDoc(doc(projectDB, 'documents', `${docName}`));
        } else {
            const teamDB = await doc(getFirestore(), 'teams', `${team.id}`)
            const projectDB = await doc(teamDB, 'projects', `${project.name}`)
            await deleteDoc(doc(projectDB, 'documents', `${docName}`));
        }
    }

    const docNav = (docID) => {
        navigate(`${docID.replace(/\s+/g, '-')}`);
        setStreamNumbersList([]);
        setActiveStreamNumbersList([]);
        setStreamNumbersListText([]);
    }

    const documentRender = documents.map(document => {
        return {icon: AccountTreeIcon, text: `${document.documentName}`, id: `${document.documentName}`, handleClick: docNav, onClickBin: deleteDocument}
    })

    return (
        <div className={styles.navigatorMinor}>
            <div className={styles.projectButtonsWrapper}>
                {designButtonsContent.map((designButtonContent) => {
                    return <SidebarRow 
                        Icon={designButtonContent.icon}
                        text={designButtonContent.text}
                        key={designButtonContent.id}
                        handleClick={designButtonContent.handleClick}
                        style={sidebarStyle}
                        />
                })}
                {documentRender.map((document) => {
                    return <SidebarRow
                        Icon={document.icon}
                        text={document.text}
                        key={document.id}
                        handleClick={document.handleClick}
                        style={sidebarStyle}
                        document={document}
                        onClickBin={document.onClickBin}
                    />
                })}
            </div>
        </div>
    )
}

export default ProjectNavMinor