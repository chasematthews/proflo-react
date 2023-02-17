import React, {useState} from 'react';
import styles from '../styles/Home.module.css';
import HomeHeader from '../components/Home/HomeHeader';
import HomeNav from '../components/Home/HomeNav';
import HomeMain from '../components/Home/HomeMain';
import AddProjectModal from '../components/Home/Project/AddProjectModal';
import AddTeamModal from '../components/Home/AddTeamModal';
import { setDoc, doc } from 'firebase/firestore';
import { UserAuth } from '../contexts/AuthContext';

const Home = ({ projects, setProjects}) => {
    const { userRef } = UserAuth();
    // const { companyRef } = UserAuth();
    // const { user } = UserAuth();

    // console.log(user)

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

    const headerStyle = styles.header

    const [projectModal, setProjectModal] = useState(false);
    const [teamModal, setTeamModal] = useState(false);

    //Define Methods
    const toggleProjectModal = () => {
        setProjectModal(!projectModal)
    }

    const toggleTeamModal = () => {
        setTeamModal(!teamModal)
    }

    const addProject = (event) => {
        event.preventDefault();
        toggleProjectModal();

        setProjects(
            projects.concat(project)
        )
        if (userRef) {
            saveProject(project)
        }
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
        try {
            await setDoc(doc(userRef, 'projects', `${project.name}`), {
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
            <AddProjectModal 
                modal={projectModal} 
                toggleModal={toggleProjectModal} 
                addProject={addProject}
                project={project}
                onChange={handleProjectChange}
            />
            <AddTeamModal
                modal={teamModal} 
                toggleModal={toggleTeamModal} 
            />
            <HomeHeader 
                headerStyle = {headerStyle}
            />
            <HomeNav
                toggleProjectModalHandleClick = {toggleProjectModal}
                toggleTeamModalHandleClick = {toggleTeamModal}
            />
            <HomeMain 
                projects = {projects}
            />
        </div>
    )
}

export default Home;