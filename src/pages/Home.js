import React, {useState} from 'react';
import styles from '../styles/Home.module.css';
import HomeHeader from '../components/Home/HomeHeader';
import HomeNav from '../components/Home/HomeNav';
import HomeMain from '../components/Home/HomeMain';
import Modal from '../components/Home/Project/AddProjectModal'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

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
        
        saveProject(project)
    }

    const handleProjectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setProject(project => ({
            ...project,
            [name]: value
        }))
    }

    const saveProject = async(project) => {
        console.log(project)
        try {
            await addDoc(collection(getFirestore(), 'projects'), {
                name: project.name,
                client: project.client,
                description: project.description,
                capacity: project.capacity,
                rawMaterial: project.rawMaterial,
                product: project.product,
                projectStage: project.projectStage,
                team: project.team
            });
        }
        catch(error) {
            console.log('Error writing new project to Firebase Database');
        }
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