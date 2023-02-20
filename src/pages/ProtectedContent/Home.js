import React, {useState} from 'react';
import styles from '@styles/Home.module.css';
import HomeHeader from '@components/Home/HomeHeader';
import HomeNav from '@components/Home/HomeNav';
import HomeMain from '@components/Home/HomeMain';
import AddProjectModal from '@components/Home/Project/AddProjectModal';
import AddTeamModal from '@components/Home/AddTeamModal';
import { setDoc, doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '@contexts/AuthContext';

const Home = ({ projects, setProjects, teams, setTeams}) => {

    //Import the user database from the AuthContext
    const { userRef } = UserAuth();

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
    const [team, setTeam] = useState({
        name: '',
        description: '',
        members: [],
    })
    const [member, setMember] = useState({
        email: '',
        UID: ''
    })

    const [members, setMembers] = useState([{
        email: 'chase.matt@outlook.com',
        UID: 'wefwfefwefwefwefwefwfwef'
    }])
    const [projectModal, setProjectModal] = useState(false);
    const [teamModal, setTeamModal] = useState(false);

    console.log(members)

    //Define Toggle Project Modal Function - makes the project Modal appear
    const toggleProjectModal = () => {
        setProjectModal(!projectModal)
    }

    //Define the addProject function - turns the project modal off, adds the project data to the projects state array and then saves the project data to the database
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

    //Updates the project information when the form data is entered
    const handleProjectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setProject(project => ({
            ...project,
            [name]: value
        }))
    }

    //Saves project to database
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

    //Define the Toggle Team Modal Function - makes the team Modal appear
    const toggleTeamModal = () => {
        setTeamModal(!teamModal)
    }

    //Define the addTeam function - turns the team modal off, adds the team data to the projects state array and then saves the team data to the database
    const addTeam = (event) => {
        event.preventDefault();
        toggleTeamModal();

        setTeams(
            teams.concat(team)
        )
        if (userRef) {
            saveTeamToUser(team)
        }
    }

    //Updates the project information when the form data is entered
    const handleTeamChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setTeam(team => ({
            ...team,
            [name]: value,
            members: members.concat(members)
        }))
    }

    //Saves project within the user collection of a database
    const saveTeamToUser = async(team) => {
        try {
            await setDoc(doc(userRef, 'teams', `${team.name}`), {
                name: team.name,
            });
        }
        catch(error) {
            console.log('Error writing new project to Firebase Database');
        }
        saveTeamToDB(team);
    }

    //Save project to the database as a separate collection
    const saveTeamToDB = async(team) => {
        const teamID = await makeid();
        try {
            await setDoc(doc(getFirestore(), 'teams', `${teamID}`), {
                name: team.name,
                description: team.description,
            });
        }
        catch(error) {
            console.log('Error writing new project to Firebase Database')
        }
        updateMembersinDB(team, teamID)
    }

    const updateMembersinDB = async(team, teamID) => {
        // const teamDB = await getDoc(doc(getFirestore(), 'teams', `${teamID}`))
        // await setDoc((teamDB, 'members', `${team.members[0]}`), {
        //     email: team.members[0]
        // })
        // // team.members.map(async(member) => {
        // //     await setDoc((teamDB, 'users', `${member}`), {
        // //         email: member
        // //     })
        // // })
    }

    //Generate a random ID which will be assigned to the group
    const makeid = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 30) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result
    }

    const headerStyle = styles.header;

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
                addTeam={addTeam}
                team={team}
                onChange={handleTeamChange}
                member={member}
                members={members}
                setMember={setMember} 
                setMembers={setMembers}
            />
            <HomeHeader
                headerStyle={headerStyle}
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