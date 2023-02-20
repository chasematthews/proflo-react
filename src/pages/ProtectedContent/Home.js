import React, {useState, useEffect} from 'react';
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

    //Import the current user info from the AuthContext
    const { user } = UserAuth();

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
    const initialTeamState = {
        name: '',
        description: '',
        members: [],
    }
    const [team, setTeam] = useState(initialTeamState)

    const [member, setMember] = useState({
        email: '',
        UID: '',
    })

    const initialMembersState = [{
        email: user.email,
        UID: user.uid,
    }]

    const [members, setMembers] = useState(initialMembersState)

    const [projectModal, setProjectModal] = useState(false);
    const [teamModal, setTeamModal] = useState(false);

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

        setTeam(initialTeamState)
        setMembers(initialMembersState)
        event.target.reset()
    }

    //Updates the project information when the form data is entered
    const handleTeamChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setTeam(team => ({
            ...team,
            [name]: value,
        }))
    }

    //Saves project within the user collection of a database
    const saveTeamToUser = async(team) => {
        const teamID = await makeid();
        try {
            await setDoc(doc(userRef, 'teams', `${teamID}`), {
                id: teamID
            });
        }
        catch(error) {
            console.log('Error writing new project to Firebase Database');
        }
        saveTeamToDB(team, teamID);
    }

    //Save project to the database as a separate collection
    const saveTeamToDB = async(team, teamID) => {
        console.log(team.members)
        try {
            await setDoc(doc(getFirestore(), 'teams', `${teamID}`), {
                name: team.name,
                description: team.description,
                members: team.members
            });
        }
        catch(error) {
            console.log('Error writing new project to Firebase Database')
        }
        saveTeamToMembers(team, teamID)
    }

    const saveTeamToMembers = async(team, teamID) => {
        team.members.map(async(member, key) => {
            const userDB = doc(getFirestore(), 'users', `${member.UID}`)
            try {
                await setDoc(doc(userDB, 'teams', `${teamID}`), {
                    id: teamID
                })
            }
            catch(error) {
                console.log(error)
            }
        })
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

    useEffect(() => {
        setTeam(team => ({
            ...team,
            members: members
        }))
    }, [members])

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
                teams = {teams}
            />
            <HomeMain 
                projects = {projects}
            />
        </div>
    )
}

export default Home;