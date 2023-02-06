import React from "react"
import HomeHeader from "../components/Home/HomeHeader"
import ProjectMain from "../components/Project/ProjectMain"
import ProjectNavMain from "../components/Project/ProjectNavMain"
import styles from '../styles/Project.module.css'

const ProjectOne = () => {
    return (
        <div className={styles.container}>
            <HomeHeader />
            <ProjectNavMain />
            <ProjectMain />
        </div>
    )
}

export default ProjectOne