import React from "react"
import HomeHeader from "../components/Home/HomeHeader"
import ProjectMain from "../components/Project/ProjectMain"
import ProjectNavMain from "../components/Project/ProjectNavMain"
import ProjectNavMinor from "../components/Project/ProjectNavMinor"
import styles from '../styles/Project.module.css'

const ProjectOne = ({project}) => {

    const headerStyle = styles.header

    return (
        <div className={styles.container}>
            <HomeHeader
                headerStyle={headerStyle} 
            />
            <ProjectNavMain project={project}/>
            <ProjectNavMinor />
            <ProjectMain />
        </div>
    )
}

export default ProjectOne