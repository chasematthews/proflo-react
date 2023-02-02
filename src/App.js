import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import Project from './pages/Project';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/projects' element={<Project />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;