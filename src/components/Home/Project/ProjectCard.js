import React from 'react';
import styles from '../../../styles/Home.module.css';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({project, team}) => {

    const navigate = useNavigate();

    const goToProject = () => {
        if (team !== undefined) {
            navigate(`/${team.name.replace(/\s+/g, '-')}/${project.name.replace(/\s+/g, '-')}/design`)
        } else {
            console.log(project.name)
            navigate(`/projects/${project.name.replace(/\s+/g, '-')}/design`)
        }
    }

    return (
        <div className={styles.projectCard} onClick={goToProject}>
            <div className={styles.projectImageWrapper}>
                <img src={require('./../../../images/ProjectImage.jpg')} className={styles.projectImage} alt='Project'/>
            </div>
            <h3>{project.name}</h3>
            <div className={styles.tagsWrapper}>
                <h4>{project.client}</h4>
                <h4>{project.rawMaterial}</h4>
                <h4>{project.product}</h4>
            </div>
        </div>
    )
}

export default ProjectCard