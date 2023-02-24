import React from 'react';
import styles from '../../../styles/Home.module.css';
import ProjectCard from './ProjectCard';

const ProjectDashboard = ({title, projects, team}) => {

    return (
        <div className={styles.main}>
            <h2 className={styles.projectDashboardTitle}>{title}</h2>
            <div className={styles.mainGrid}>
                {team === null ?
                    projects.projects.map((project, key) => {
                        return (
                            <ProjectCard
                                project={project}
                                key={key}
                            />
                        )
                    })
                    :
                    projects[team.id].map((project, key) => {
                        return (
                            <ProjectCard
                                project={project}
                                key={key}
                                team={team}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProjectDashboard