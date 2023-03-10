import React from 'react'
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import SidebarRow from '../Home/SidebarRow';
import styles from '../../styles/Project.module.css'
import { useNavigate } from 'react-router-dom';

const ProjectNavMain = ({project, team, setStreamNumbersList, setActiveStreamNumbersList, setStreamNumbersListText}) => {

    const navigate = useNavigate()

    const sidebarStyle = styles.sidebarRow

    const navigateDesign = () => {
        if (team !== null) {
            navigate(`/${team.name.replace(/\s+/g, '-')}/${project.name.replace(/\s+/g, '-')}/design`)
        } else {
            navigate(`/projects/${project.name.replace(/\s+/g, '-')}/design`)
        }
    }

    const navigateComments = () => {
        if (team !== null) {
            navigate(`/${team.name.replace(/\s+/g, '-')}/${project.name.replace(/\s+/g, '-')}/comments`);
            setStreamNumbersList([]);
            setActiveStreamNumbersList([]);
            setStreamNumbersListText([]);
        } else {
            navigate(`/projects/${project.name.replace(/\s+/g, '-')}/comments`);
            setStreamNumbersList([]);
            setActiveStreamNumbersList([]);
            setStreamNumbersListText([]);
        }
    }

    const navigateHome = () => {
        navigate('/projects');
        setStreamNumbersList([]);
        setActiveStreamNumbersList([]);
        setStreamNumbersListText([]);
    }

    const projectButtonsContent = [
        {icon: HomeIcon, text: 'Home', id: 'Home', handleClick: navigateHome},
        {icon: WebAssetIcon, text: 'Design', id: 'Design', handleClick: navigateDesign},
        {icon: CommentIcon, text: 'Comments Register', id: 'CommentsRegister', handleClick: navigateComments},
    ]

    return (
        <div className={styles.navigator}>
            <div className={styles.projectNameWrapper}>{project.name}</div>
            <hr></hr>
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