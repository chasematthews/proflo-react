import React, {useState} from 'react';
import styles from '../styles/Project.module.css';
import ProjectHeader from '../components/Project/ProjectHeader';
import ProjectNav from '../components/Project/ProjectNav';
import ProjectMain from '../components/Project/ProjectMain';
import Modal from '../components/Project/AddProjectModal'

const Project = () => {
    //Define State Variables
    const [project, setProject] = useState({
        name: '',
        client: '',
        description: '',
        capacity: '',
        rawMaterial: '',
        product: '',
        projectStage: '',
        team: '',
    });
    const [projects, setProjects] = useState([]);
    const [projectModal, setProjectModal] = useState(false);


    //Define Methods
    const toggleProjectModal = () => {
        setProjectModal(!projectModal)
    }

    const addProject = (event) => {
        event.preventDefault();
        toggleProjectModal();

        setProjects(
            projects.concat(project)
        )
    }

    const handleProjectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setProject(project => ({
            ...project,
            [name]: value
        }))
    }

    return (
        <div className={styles.container}>
            <Modal 
                modal={projectModal} 
                toggleModal={toggleProjectModal} 
                addProject={addProject}
                project={project}
                onChange={handleProjectChange}
            />
            <ProjectHeader />
            <ProjectNav
                toggleProjectModalHandleClick = {toggleProjectModal}
            />
            <ProjectMain 
                projects = {projects}
            />
        </div>
    )
}

export default Project;