import React from 'react';
import styles from '../../styles/Project.module.css';

const ProjectMain = ({projects}) => {
    return (
        <div className={styles.main}>
            {projects.map((project) => {
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
            })}
        </div>
    )
}

export default ProjectMain;