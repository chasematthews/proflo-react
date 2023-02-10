import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Content from "./pages/Content"
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthContextProvider } from "./contexts/AuthContext";

const App = () => {

  return (
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
              <Route element={<Content />} path='/*' />
              <Route element={<Login />} path='/login' />
              <Route element={<SignUp />} path='/signup' />
              <Route element={<ForgotPassword />} path='/resetpassword' />
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;