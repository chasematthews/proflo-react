import React from 'react';
import styles from '../../styles/Home.module.css';
import ProjectCard from './Project/ProjectCard'


const HomeMain = ({projects}) => {

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

export default HomeMain;