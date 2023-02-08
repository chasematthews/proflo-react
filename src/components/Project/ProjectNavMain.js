import React from 'react'
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CommentIcon from '@mui/icons-material/Comment';
import SidebarRow from '../Home/SidebarRow';
import styles from '../../styles/Project.module.css'

const ProjectNavMain = ({project}) => {

    const sidebarStyle = styles.sidebarRow

    const projectButtonsContent = [
        {icon: WebAssetIcon, text: 'Design', id: 'Design'},
        {icon: CommentIcon, text: 'Comments Register', id: 'CommentsRegister'},
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