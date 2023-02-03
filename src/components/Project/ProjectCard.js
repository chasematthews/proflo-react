import React from 'react';
import styles from '../../styles/Project.module.css';

const ProjectCard = ({project}) => {
    return (
        <div className={styles.projectCard}>
            <div className={styles.projectImageWrapper}>
                <img src={require('./../../images/ProjectImage.jpg')} className={styles.projectImage} alt='Project'/>
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