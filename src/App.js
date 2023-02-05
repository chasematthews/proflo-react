import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from "./contexts/AuthContext";
import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "@firebase/app";

initializeApp(firebaseConfig)

const App = () => {
  return (
    <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/projects' element={<Home />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;