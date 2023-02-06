import React, {useState, useEffect} from 'react';
import styles from '../styles/Home.module.css';
import HomeHeader from '../components/Home/HomeHeader';
import HomeNav from '../components/Home/HomeNav';
import HomeMain from '../components/Home/HomeMain';
import Modal from '../components/Home/Project/AddProjectModal'
import { getFirestore, collection, addDoc, query, onSnapshot} from 'firebase/firestore'

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

    const headerStyle = styles.header

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

    const loadProjects = () => {
        const recentMessagesQuery = query(collection(getFirestore(), 'projects'))

        onSnapshot(recentMessagesQuery, (snapshot) => {
            setProjects(snapshot.docs.map(doc => doc.data()));
        })
    }

    useEffect(() => {
        loadProjects();
    }, [])


    // useEffect(() => {
    //     loadProjects();
    // }, [])

    return (
        <div className={styles.container}>
            <Modal 
                modal={projectModal} 
                toggleModal={toggleProjectModal} 
                addProject={addProject}
                project={project}
                onChange={handleProjectChange}
            />
            <HomeHeader 
                headerStyle = {headerStyle}
            />
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