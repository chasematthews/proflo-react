import React from "react"
import ProjectHeader from "../components/Project/ProjectHeader"
import ProjectMain from "../components/Project/ProjectMain"
import ProjectNavMain from "../components/Project/ProjectNavMain"
import ProjectNavMinor from "../components/Project/ProjectNavMinor"
import styles from '../styles/Project.module.css'

const ProjectOne = () => {
    return (
        <div className={styles.container}>
            <ProjectHeader />
            <ProjectNavMain />
            <ProjectNavMinor />
            <ProjectMain />
        </div>
    )
}

export default ProjectOne