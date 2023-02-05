import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContextProvider } from "./contexts/AuthContext";
import Protected from "./utils/Protected";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
              <Route 
                element={
                  <Protected>
                    <Home />
                  </Protected>
                  } 
                path='/home' 
              />
              <Route element={<Login />} path='/login' />
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;