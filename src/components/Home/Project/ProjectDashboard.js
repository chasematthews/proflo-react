import React from 'react';
import styles from '../../../styles/Home.module.css';
import ProjectCard from './ProjectCard';
import { getDoc, doc, getFirestore, deleteDoc, onSnapshot, query, collection } from 'firebase/firestore';
import { UserAuth } from '../../../contexts/AuthContext';

const ProjectDashboard = ({title, projects, team, setProjects}) => {

      //import the user database from the AuthContext
  const {userRef} = UserAuth();

    const deleteTeam = (projectName) => {
        if (team === null) {
            setProjects(projects => ({
                projects: projects.projects.filter(project => project.name !== `${projectName}`)
            })) 
        } else {
            setProjects(projects => ({
                ...projects,
                [team.id]: projects[team.id].filter(project => project.name !== `${projectName}`)
            }))
        }
        deleteFromDB(projectName)
    }

    const deleteFromDB = async (projectName) => {
        console.log('hello')
        if (team === null) {
            const projectDB = await doc(userRef, 'projects', `${projectName}`)
            const documentQuery = await query(collection(projectDB, 'documents'))
            const commentQuery = await query(collection(projectDB, 'comments'))
            await onSnapshot(documentQuery, (snapshot) => {
                snapshot.docs.map(doc => deleteDoc(doc.ref))
            })
            await onSnapshot(commentQuery, (snapshot) => {
                snapshot.docs.map(doc => deleteDoc(doc.ref))
            })
            await deleteDoc(projectDB)
        } else {
            const teamDB = await doc(getFirestore(), 'teams', `${team.id}`)
            const projectDB = await doc(teamDB, 'projects', `${projectName}`)
            const documentQuery = await query(collection(projectDB, 'documents'))
            const commentQuery = await query(collection(projectDB, 'comments'))
            await onSnapshot(documentQuery, (snapshot) => {
                snapshot.docs.map(doc => deleteDoc(doc.ref))
            })
            await onSnapshot(commentQuery, (snapshot) => {
                snapshot.docs.map(doc => deleteDoc(doc.ref))
            })
            await deleteDoc(doc(teamDB, 'projects', `${projectName}`))
        }
    }

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
                                onBinClick={deleteTeam}
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
                                onBinClick={deleteTeam}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProjectDashboard