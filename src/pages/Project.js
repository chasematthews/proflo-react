import React, {useState} from 'react';
import styles from '../styles/Project.module.css';
import ProjectNav from '../components/Project/ProjectNav';
import ProjectMain from '../components/Project/ProjectMain';
import Modal from '../components/Project/AddProjectModal'

const Project = () => {
    const [project, setProject] = useState({
        name: '',
        client: '',
        description: '',
        capacity: '',
        rawMaterial: '',
        product: '',
        projectStage: '',
        team: [],
    });

    const [projects, setProjects] = useState([]);

    const [projectModal, setProjectModal] = useState(false);

    const toggleProjectModal = () => {
        setProjectModal(!projectModal)
    }

    const addProject = (event) => {
        event.preventDefault();
        toggleProjectModal();
        console.log('hello');
    }

    return (
        <div className={styles.container}>
            <Modal 
                modal={projectModal} 
                toggleModal={toggleProjectModal} 
                addProject={addProject}
            />
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
            <ProjectNav
                toggleProjectModalHandleClick = {toggleProjectModal}
            />
            <ProjectMain />
        </div>
    )
}

export default Project;