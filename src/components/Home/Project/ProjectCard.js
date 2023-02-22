import React, {useState} from 'react';
import styles from '../../../styles/Home.module.css';
import { useNavigate } from 'react-router-dom';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5'

const ProjectCard = ({project, team}) => {

    const navigate = useNavigate();

    const goToProject = () => {
        if (team !== undefined) {
            navigate(`/${team.name.replace(/\s+/g, '-')}/${project.name.replace(/\s+/g, '-')}/design`)
        } else {
            navigate(`/projects/${project.name.replace(/\s+/g, '-')}/design`)
        }
    }

    const [numPage, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPage);
        setPageNumber(1);
    }
    
    console.log(project.PDFURL)

    return (
        <div className={styles.projectCard} onClick={goToProject}>
            <div className={styles.projectImageWrapper}>
                {/* <Drawing project={project} /> */}
                {/* <Thumbnail url="https://www.npmjs.com/package/react-webpage-thumbnail" /> */}
                {/* <img src={require('./../../../images/ProjectImage.jpg')} className={styles.projectImage} alt='Project'/> */}
                {project.PDFURL ? 
                    <object data={`${project.PDFURL}`} type="application/pdf" width="100%" height="100%">
                        <p>Alternative text - include a link <a href={`${project.PDFURL}`}>to the PDF!</a></p>
                    </object> :
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