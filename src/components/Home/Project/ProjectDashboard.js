import React from 'react';
import styles from '../../../styles/Home.module.css';
import ProjectCard from './ProjectCard';

const ProjectDashboard = ({title, projects, team}) => {

    return (
        <div className={styles.main}>
            <h2>{title}</h2>
            {/* {projects.map((project, key) => {
                return (
                    <ProjectCard
                        project = {project}
                        key = {key}
                    />
                )
            })} */}
        </div>
    )
}

export default ProjectDashboard