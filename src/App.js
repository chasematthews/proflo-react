import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

initializeApp(firebaseConfig);

const initFirebaseAuth = () => {
  onAuthStateChanged(getAuth(), authStateObserver)
}

const authStateObserver = (user) => {
  if (user) {
    console.log('true');
  } else {
    console.log('false')
  }
}

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/projects' element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}


initFirebaseAuth()
export default App;