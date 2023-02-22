import React from 'react'
import SidebarRow from '../Home/SidebarRow';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../styles/Project.module.css';
import { useNavigate } from 'react-router-dom';

const ProjectNavMinor = ({toggleDocumentModal, documents}) => {

    console.log(documents)

    const navigate = useNavigate();

    const sidebarStyle = styles.sidebarRowMinor

    const designButtonsContent = [
        {icon: AddIcon, text: 'Add Doc', id: 'Add Doc', handleClick: toggleDocumentModal}
    ]

    const documentRender = documents.map(document => {
        return {icon: AccountTreeIcon, text: `${document.documentName}`, id: `${document.name}`, handleClick: function() {navigate(`${document.documentName.replace(/\s+/g, '-')}`)}}
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
                    />
                })}
            </div>
        </div>
    )
}

export default ProjectNavMinor