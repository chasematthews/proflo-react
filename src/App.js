import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContextProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
              <Route element={<Home />} path='/home' />
              <Route element={<Login />} path='/login' />
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;