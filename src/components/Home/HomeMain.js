import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectDashboard from './Project/ProjectDashboard';
import ActionsRegister from './Actions/Actions';


const HomeMain = ({projects}) => {

    return (
        <Routes>
            <Route element={<ProjectDashboard projects={projects}/>} path='/projects'/>
            <Route element={<ActionsRegister />} path='/actions'/>
        </Routes>
    )
}

export default HomeMain;