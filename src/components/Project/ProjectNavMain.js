import React from 'react'
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CommentIcon from '@mui/icons-material/Comment';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarRow from '../Home/SidebarRow';
import styles from '../../styles/Project.module.css'

const ProjectNavMain = () => {

    const sidebarStyle = styles.sidebarRow

    const projectButtonsContent = [
        {icon: WebAssetIcon, text: 'Design', id: 'Design'},
        {icon: CommentIcon, text: 'Comments Register', id: 'CommentsRegister'},
        {icon: IntegrationInstructionsIcon, text: 'Integrations', id: 'Integrations'}
    ]

    const generalButtonsContent = [
        {icon: CircleNotificationsIcon, text: 'Notifications', id: 'Notifications'},
        {icon: SettingsIcon, text: 'Settings', id: 'Settings'}
    ]

    return (
        <div className={styles.navigator}>
            <div className={styles.companyNameWrapper}></div>
            <div className={styles.projectButtonsWrapper}>
                {projectButtonsContent.map((projectButtonContent) => {
                    return <SidebarRow 
                        Icon={projectButtonContent.icon}
                        text={projectButtonContent.text}
                        key={projectButtonContent.id}
                        handleClick={projectButtonContent.handleClick}
                        style={sidebarStyle}
                        />
                })}
            </div>
            <div className={styles.generalButtonsWrapper}>
                {generalButtonsContent.map((generalButtonContent) => {
                    return <SidebarRow 
                        Icon={generalButtonContent.icon}
                        text={generalButtonContent.text}
                        key={generalButtonContent.id}
                        handleClick={generalButtonContent.handleClick}
                        style={sidebarStyle}
                    />
                })}
            </div>
        </div>
    )
}

export default ProjectNavMain