import React from 'react';
import styles from '../../styles/Project.module.css';
import ProjectCard from './ProjectCard'

const ProjectMain = ({projects}) => {
    return (
        <div className={styles.main}>
            {projects.map((project) => {
                return (
                    <ProjectCard
                        project = {project}
                    />
                )
            })}
        </div>
    )
}

export default ProjectMain;