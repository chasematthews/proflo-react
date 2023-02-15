import React from 'react'
import SidebarRow from '../Home/SidebarRow';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import styles from '../../styles/Project.module.css';

const ProjectNavMinor = () => {

    const sidebarStyle = styles.sidebarRowMinor

    const designButtonsContent = [
        {icon: AccountTreeIcon, text: 'PFDs', id: 'PFDs'}
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