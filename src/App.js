import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from "./contexts/AuthContext";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const App = () => {

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyAONOFkOok3qVDpVy9hu42OSlKUSB-XVT0",
    authDomain: "proflo-d9ccc.firebaseapp.com",
    projectId: "proflo-d9ccc",
    storageBucket: "proflo-d9ccc.appspot.com",
    messagingSenderId: "888727536000",
    appId: "1:888727536000:web:f1f229291220661a6c0165",
    measurementId: "G-9L9NCQC9T7"
  })
  
  const auth = getAuth(firebaseApp)

  return (
    <BrowserRouter>
        <AuthProvider auth={auth}>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/projects' element={<Home />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;