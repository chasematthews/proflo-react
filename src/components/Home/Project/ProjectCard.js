import React, {useEffect, useState} from 'react';
import styles from '../../../styles/Home.module.css';
import { useNavigate } from 'react-router-dom';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5'
import { doc, getDoc, getFirestore, getCollection, onSnapshot, query, collection } from 'firebase/firestore';

const ProjectCard = ({project, team}) => {

    const[imageURL, setImageURL] = useState('')
    console.log(imageURL)

    const navigate = useNavigate();

    const goToProject = () => {
        if (team !== undefined) {
            navigate(`/${team.name.replace(/\s+/g, '-')}/${project.name.replace(/\s+/g, '-')}/design`)
        } else {
            navigate(`/projects/${project.name.replace(/\s+/g, '-')}/design`)
        }
    }

    const getProjectImages = async() => {
        const teamDB = await doc(getFirestore(), 'teams', `${team.id}`)
        const projectDB = await doc(teamDB, 'projects', `${project.name}`)
        const docQuery = query(collection(projectDB, 'documents'))
        onSnapshot(docQuery, (snapshot) => {
            setImageURL(snapshot.docs[1].data().screenGrab)
        })
    }

    useEffect(() => {
        getProjectImages()
    })

    return (
        <div className={styles.projectCard} onClick={goToProject}>
            <div className={styles.projectImageWrapper}>
                {imageURL ? 
                    <img src={`${imageURL}`} alt='Document Preview' /> :
                    // <object data={`${project.PDFURL}`} type="application/pdf" width="100%" height="100%">
                    //     <p>Alternative text - include a link <a href={`${project.PDFURL}`}>to the PDF!</a></p>
                    // </object> :
                    <div></div>
                }
            </div>
            <h3>{project.name}</h3>
            <div className={styles.tagsWrapper}>
                <h4>{project.client}</h4>
                <h4>{project.rawMaterial}</h4>
                <h4>{project.product}</h4>
            </div>
        </div>
    )
}

export default ProjectCard