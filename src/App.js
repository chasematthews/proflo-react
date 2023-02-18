import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/AuthPages/Login';
import SignUp from "./pages/AuthPages/Signup";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedContent from "./pages/ProtectedContent";

const App = () => {

  return (
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
              <Route element={<ProtectedContent />} path='/*' />
              <Route element={<Login />} path='/login' />
              <Route element={<SignUp />} path='/signup' />
              <Route element={<ForgotPassword />} path='/resetpassword' />
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;