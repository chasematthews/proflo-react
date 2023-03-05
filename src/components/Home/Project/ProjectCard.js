import React, {useEffect, useState} from 'react';
import styles from '../../../styles/Home.module.css';
import { useNavigate } from 'react-router-dom';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5'
import { doc, getDoc, getFirestore, getCollection, onSnapshot, query, collection, onSnapshotsInSync } from 'firebase/firestore';
import { UserAuth } from '../../../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectCard = ({project, team, onBinClick}) => {

    useEffect(() => {
        if (team !== undefined) {
            setClickFunction({goToProject})
        }
    }, [team])

    const[imageURL, setImageURL] = useState('')

    //import the user database from the AuthContext
    const {userRef} = UserAuth();

    const navigate = useNavigate();

    const goToProject = () => {
        if (team !== undefined) {
            navigate(`/${team.name.replace(/\s+/g, '-')}/${project.name.replace(/\s+/g, '-')}/design`)
        } else {
            navigate(`/projects/${project.name.replace(/\s+/g, '-')}/design`)
        }
    }

    const getProjectImages = async() => {
        let projectDB;
        if (team === undefined) {
            projectDB = await doc(userRef, 'projects', `${project.name}`)
            const docQuery = query(collection(projectDB, 'documents'))
            onSnapshot(docQuery, (snapshot) => {
                if (snapshot.docs.length !== 0) {
                    setImageURL(snapshot.docs[0].data().screenGrab)
                }
            })
        } else {
            const teamDB = await doc(getFirestore(), 'teams', `${team.id}`)
            projectDB = await doc(teamDB, 'projects', `${project.name}`)
            const docQuery = query(collection(projectDB, 'documents'))
            onSnapshot(docQuery, (snapshot) => {
                if (snapshot.docs.length !== 0) {
                    setImageURL(snapshot.docs[0].data().screenGrab)
                }
            })
        }
    }

    const[clickFunction, setClickFunction] = useState({goToProject})
    const [optionsModal, setOptionsModal] = useState(false)

    const showOptionsButton = () => {
        setOptionsModal(true)
    }

    const hideOptionsButton = () => {
        setOptionsModal(false)
    }

    const cancelClickFunction = () => {
        setClickFunction(null)
    }

    const reinstateClickFunction = () => {
        setClickFunction({goToProject})
    }

    const optionsClick = () => {
        onBinClick(project.name)
    }

    useEffect(() => {
        getProjectImages()
    })

    return (
        <div className={styles.projectCard} onClick={clickFunction && clickFunction.goToProject} onMouseOver={showOptionsButton} onMouseOut={hideOptionsButton}>
            <div className={styles.projectImageWrapper}>
                {imageURL ? 
                    <img className={styles.previewImage} src={`${imageURL}`} alt='Document Preview' /> :
                    <div></div>
                }
            </div>
            <h3>{project.name}</h3>
            <div className={styles.tagsWrapper}>
                <h4>{project.client}</h4>
                <h4>{project.rawMaterial}</h4>
                <h4>{project.product}</h4>
            </div>
            {optionsModal && <div className={styles.optionsBtnWrapper}><DeleteIcon onMouseOver={cancelClickFunction} onMouseOut={reinstateClickFunction} onClick={optionsClick} className={styles.moreOptions}/></div>}
        </div>
    )
}

export default ProjectCard