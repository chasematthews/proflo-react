import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProjectOne from "./pages/ProjectOne";
import { AuthContextProvider } from "./contexts/AuthContext";
import Protected from "./utils/Protected";
import { query, collection, getFirestore, onSnapshot } from "firebase/firestore";

const App = () => {

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
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
              <Route element={<Protected><Home projects={projects} setProjects={setProjects}/></Protected>} path='/' />
              {/* <Route element={<Protected><ProjectOne /></Protected>} path='/project-one' /> */}
              <Route element={<Login />} path='/login' />
              {projects.map((project) => {
                return (
                  <Route element={<Protected><ProjectOne project={project}/></Protected>} path={`/${project.name.replace(/\s+/g, '-')}`} />
                )
              })}
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;