import React from "react"
import HomeHeader from "../components/Home/HomeHeader"
import ProjectMain from "../components/Project/ProjectMain"
import ProjectNavMain from "../components/Project/ProjectNavMain"
import ProjectNavMinor from "../components/Project/ProjectNavMinor"
import styles from '../styles/Project.module.css'

const ProjectOne = () => {

    const headerStyle = styles.header

    return (
        <div className={styles.container}>
            <HomeHeader
                headerStyle={headerStyle} 
            />
            <ProjectNavMain />
            <ProjectNavMinor />
            <ProjectMain />
        </div>
    )
}

export default ProjectOne