import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './Home';
import ProjectOne from "./ProjectOne";
import {query, collection, onSnapshot} from 'firebase/firestore'
import Protected from '../utils/Protected';
import { UserAuth } from '../contexts/AuthContext';

const Content = () => {

    const {userRef} = UserAuth();
    const {companyRef} = UserAuth();

    console.log(companyRef)

    const [projects, setProjects] = useState([]);
  
    const loadProjects = () => {
      if (companyRef) {
        const recentMessagesQuery = query(collection(companyRef, 'projects'))
        onSnapshot(recentMessagesQuery, (snapshot) => {
          setProjects(snapshot.docs.map(doc => doc.data()));
        })
      }
    }
  
    useEffect(() => {
      if (companyRef) {
        loadProjects();
      }
    }, [companyRef])
  
    return (
    <Routes>
        <Route element={<Protected><Home projects={projects} setProjects={setProjects}/></Protected>} path='/*' />
        {projects.map((project, key) => {
            return (
            <Route key={key} element={<Protected><ProjectOne project={project}/></Protected>} path={`/${project.name.replace(/\s+/g, '-')}/*`} />
            )
        })}
    </Routes>
    );
  }
  
  export default Content;