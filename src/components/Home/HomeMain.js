import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectDashboard from './Project/ProjectDashboard';
import ActionsRegister from './Actions/Actions';


const HomeMain = ({projects, teams}) => {

    console.log(teams)

    return (
        <Routes>
            <Route element={<ProjectDashboard projects={projects}/>} path='projects'/>
            {teams.map((team, key) => {
                return (
                <Route key={key} element={<ProjectDashboard projects={projects}/>} path={`/${team.name.replace(/\s+/g, '-')}/*`} />
                )
            })}
            <Route element={<ActionsRegister />} path='/actions'/>
        </Routes>
    )
}

export default HomeMain;