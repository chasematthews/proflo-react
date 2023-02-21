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

  //Define the load teams function - pulling the required information from the database and setting it to the state variable every load.
  const loadTeams = () => {
    const teamsQuery = query(collection(userRef, 'teams'))
    onSnapshot(teamsQuery, (snapshot) => {
      setTeams(snapshot.docs.map(doc => doc.data()));
    })
  }

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