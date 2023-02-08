import React, {useState} from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProjectOne from "./pages/ProjectOne";
import { AuthContextProvider } from "./contexts/AuthContext";
import Protected from "./utils/Protected";

const App = () => {

  const [projectPage, setProjectPage] = useState([{
    content: <Protected><ProjectOne /></Protected>,
    path: '/hello'
  }, {
    content: <Protected><ProjectOne /></Protected>,
    path: '/hello2'
  }]);

  return (
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
              <Route element={<Protected><Home /></Protected>} path='/' />
              <Route element={<Protected><ProjectOne /></Protected>} path='/project-one' />
              <Route element={<Login />} path='/login' />
              {projectPage.map((item) => {
                return (
                  <Route exact element={item.content} path={item.path} />
                )
              })}
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;