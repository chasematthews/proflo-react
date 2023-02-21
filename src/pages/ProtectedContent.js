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
  const [projects, setProjects] = useState({projects: []});
  const [teams, setTeams] = useState([])

  //Define the load projects function - pulling the required information from the database and setting it to the state variable every load.
  const loadProjects = () => {
    const individprojectsQuery = query(collection(userRef, 'projects'))
    onSnapshot(individprojectsQuery, (snapshot) => {
      setProjects(projects => ({
        ...projects,
        projects: snapshot.docs.map(doc => doc.data())
      }));
    })
    teams.map(team => {
      const teamRef = doc(getFirestore(), 'teams', `${team.id}`)
      const teamprojectsQuery = query(collection(teamRef, 'projects'))
      onSnapshot(teamprojectsQuery, (snapshot) => {
        setProjects(projects => ({
          ...projects,
          [team.id]: snapshot.docs.map(doc => doc.data())
        }))
      })
    })
  }

  //Define the load teams function - pulling the required information from the database and setting it to the state variable every load.
  const loadTeams = async() => {
    const teamsQuery = query(collection(userRef, 'teams'))
    await onSnapshot(teamsQuery, (snapshot) => {
      setTeams(snapshot.docs.map(doc => doc.data()), loadProjects());
    })
  }

  useEffect(() => {
    if (userRef) {
      loadTeams();
      loadProjects()
    }
  }, [])

  useEffect(() => {
    teams.map(team => {
      setProjects(projects => ({
        ...projects,
        [team.id]: []
      }))
    })
    if (userRef) {
      loadProjects()
    }
  }, [teams])

  return (
  <Routes>
      <Route element={<Protected><Home projects={projects} teams={teams} setProjects={setProjects} setTeams={setTeams}/></Protected>} path='/*' />
      {teams.map((team) => {
        return (
          projects[team.id] && projects[team.id].map((project) => {
            return(
              <Route key={project.name} element={<Protected><Project project={project}/></Protected>} path={`/${team.name.replace(/\s+/g, '-')}/${project.name.replace(/\s+/g, '-')}/*`} />
            )
          })
        )
      })}
  </Routes>
  );
}

export default ProtectedContent;