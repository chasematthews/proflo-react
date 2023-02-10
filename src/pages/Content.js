import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './Home';
import ProjectOne from "./ProjectOne";
import {query, collection, getFirestore, onSnapshot} from 'firebase/firestore'
import Protected from '../utils/Protected';

const Content = () => {

    const [projects, setProjects] = useState([]);
  
    const loadProjects = () => {
      const recentMessagesQuery = query(collection(getFirestore(), 'projects'))
  
      onSnapshot(recentMessagesQuery, (snapshot) => {
          setProjects(snapshot.docs.map(doc => doc.data()));
      })
    }
  
    useEffect(() => {
      loadProjects();
    }, [])
  
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