import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './ProtectedContent/Home';
import Project from "./ProtectedContent/Project";
import {query, collection, onSnapshot, getFirestore, doc, getDoc} from 'firebase/firestore'
import Protected from '@utils/Protected';
import { UserAuth } from '@contexts/AuthContext';

const ProtectedContent = () => {


  //import the user database from the AuthContext
  const {userRef} = UserAuth();

  //Declare the state variables for the list of individual projects and the teams. Initialising them here because need to add different pages for each project. They are set in nested components.
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([])

  console.log(teams)

  //Define the load projects function - pulling the required information from the database and setting it to the state variable every load.
  const loadProjects = () => {
    const projectsQuery = query(collection(userRef, 'projects'))
    onSnapshot(projectsQuery, (snapshot) => {
      setProjects(snapshot.docs.map(doc => doc.data()));
    })
  }

  const loadTeams = () => {
    const teamsQuery = query(collection(userRef, 'teams'))
    onSnapshot(teamsQuery, (snapshot) => {
      setTeams(snapshot.docs.map(doc => doc.data()));
    })
  }

  // const loadTeams = () => {
  //   const teamsQuery = query(collection(userRef, 'teams'))
  //   let teamsList = []
  //   onSnapshot(teamsQuery, async(snapshot) => {
  //     getTeams(snapshot).then(result => {readData(result)})
      // await snapshot.docs.map(async(document) => {
        // console.log(team)
        // setTeams(teams.concat(team))
        // teamsList.concat('1')
        // console.log(teamsList)
        // teamsList.concat(team)
        // console.log(team)
        // return team;
        // console.log(team)
        // setTeams(teams.concat(team))
        // setProjects(projects.concat(await (await getDoc(doc(getFirestore(), 'teams', `${document.data().id}`))).data()))
        // console.log(await (await getDoc(doc(getFirestore(), 'teams', `${document.data().id}`))).data())
        // let teamsList = [];
        // console.log(document.data().id)
        // const teamInfoQuery = await getDoc(doc(getFirestore(), 'teams', `${document.data().id}`))
        // teamsList = teamsList.concat(teamInfoQuery.data())
        // console.log(teamsList)
        // setTeams(teamsList)
      // })
  //   })
  // }

  // const readData = (arg) => {
  //   console.log(arg)
  // }



  // const getTeams = async (snapshot) => {
  //   const teamsList = []
  //   await snapshot.docs.map(async(document) => {
  //     const team = await getDoc(doc(getFirestore(), 'teams', `${document.data().id}`));
  //     console.log(team.data())
  //     teamsList.concat(team.data())
  //   })
  //   return teamsList
  // }

  useEffect(() => {
    if (userRef) {
      loadProjects();
      loadTeams();
    }
  }, [])

  

  return (
  <Routes>
      <Route element={<Protected><Home projects={projects} teams={teams} setProjects={setProjects} setTeams={setTeams}/></Protected>} path='/*' />
      {projects.map((project, key) => {
          return (
          <Route key={key} element={<Protected><Project project={project}/></Protected>} path={`/${project.name.replace(/\s+/g, '-')}/*`} />
          )
      })}
  </Routes>
  );
}

export default ProtectedContent;