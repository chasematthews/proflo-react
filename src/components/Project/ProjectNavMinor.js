import React from 'react'
import SidebarRow from '../Home/SidebarRow';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../styles/Project.module.css';

const ProjectNavMinor = ({toggleDocumentModal, documents}) => {

    const sidebarStyle = styles.sidebarRowMinor

    const designButtonsContent = [
        {icon: AddIcon, text: 'Add Doc', id: 'Add Doc', handleClick: toggleDocumentModal}
    ]

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
            </div>
        </div>
    )
}

export default ProjectNavMinor