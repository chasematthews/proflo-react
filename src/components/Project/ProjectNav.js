import React from 'react';
import styles from '../../styles/Project.module.css'
import SidebarRow from './SidebarRow';

//Import all of the required icons for the side bar
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';


const projectButtonsContent = [
    {icon: ContentPasteIcon, text: 'Projects', id: 'Projects'},
    {icon: CheckBoxIcon, text: 'Actions', id: 'Actions'},
    {icon: DesignServicesIcon, text: 'Design Data', id: 'Design-Data'},
    {icon: AttachMoneyIcon, text: 'Costing Data', id: 'Costing-Data'},
]

const generalButtonsContent = [
    {icon: CircleNotificationsIcon, text: 'Notifications', id: 'Notifications'},
    {icon: SettingsIcon, text: 'Settings', id: 'Settings'},
    {icon: AddIcon, text: 'New Project', id: 'New Project'}
]

const ProjectNav = () => {
    return (
        <div className={styles.navigator}>
            <div className={styles.companyNameWrapper}></div>
            <div className={styles.projectButtonsWrapper}>
                {projectButtonsContent.map((projectButtonContent) => {
                    return <SidebarRow 
                        Icon={projectButtonContent.icon}
                        text={projectButtonContent.text}
                        key={projectButtonContent.id}
                        />
                })}
            </div>
            <div className={styles.generalButtonsWrapper}>
                {generalButtonsContent.map((generalButtonContent) => {
                    return <SidebarRow 
                        Icon={generalButtonContent.icon}
                        text={generalButtonContent.text}
                        key={generalButtonContent.id}
                        />
                })}
            </div>
        </div>
    )
}

export default ProjectNav;