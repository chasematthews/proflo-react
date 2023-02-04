import React, {useState} from 'react';
import styles from '../styles/Home.module.css';
import HomeHeader from '../components/Home/HomeHeader';
import HomeNav from '../components/Home/HomeNav';
import HomeMain from '../components/Home/HomeMain';
import Modal from '../components/Home/Project/AddProjectModal'

const Home = () => {
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
            <HomeHeader />
            <HomeNav
                toggleProjectModalHandleClick = {toggleProjectModal}
            />
            <HomeMain 
                projects = {projects}
            />
        </div>
    )
}

export default Home;