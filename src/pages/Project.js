import React from 'react';
import styles from '../styles/Project.module.css';
import ProjectNav from '../components/Project/ProjectNav';

const Project = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.profloLogoWrapper}>
                    <img 
                        src={require('./../images/proflo-logo.png')}
                        alt={'ProFlo Logo'}
                        className={styles.profloLogo}
                    />
                </div>
                <h1>ProFlo</h1>
            </div>
            <ProjectNav />
            <div className={styles.main}></div>
        </div>
    )
}

export default Project;