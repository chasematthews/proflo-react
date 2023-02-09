import React from 'react'
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import SidebarRow from '../Home/SidebarRow';
import styles from '../../styles/Project.module.css'
import { useNavigate } from 'react-router-dom';

const ProjectNavMain = ({project}) => {

    const navigate = useNavigate()

    const sidebarStyle = styles.sidebarRow

    const projectButtonsContent = [
        {icon: HomeIcon, text: 'Home', id: 'Home', handleClick: function() {navigate('/')}},
        {icon: WebAssetIcon, text: 'Design', id: 'Design', handleClick: function() {navigate(`/${project.name.replace(/\s+/g, '-')}/design`)}},
        {icon: CommentIcon, text: 'Comments Register', id: 'CommentsRegister', handleClick: function() {navigate(`/${project.name.replace(/\s+/g, '-')}/comments`)}},
    ]

    return (
        <div className={styles.navigator}>
            <div className={styles.projectNameWrapper}>{project.name}</div>
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
        </div>
    )
}

export default ProjectNavMain