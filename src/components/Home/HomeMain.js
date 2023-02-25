import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectDashboard from './Project/ProjectDashboard';
import ActionsRegister from './Actions/Actions';


const HomeMain = ({projects, teams, setProjects}) => {

    return (
        <Routes>
            <Route element={<ProjectDashboard setProjects={setProjects} title={"My Individual Projects"} projects={projects} team={null}/>} path='projects'/>
            {teams.map((team, key) => {
                return (
                <Route key={key} element={<ProjectDashboard setProjects={setProjects} title={team.name} projects={projects} team={team}/>} path={`/${team.name.replace(/\s+/g, '-')}`} />
                )
            })}
            <Route element={<ActionsRegister title={"Actions Register"}/>} path='/actions'/>
        </Routes>
    )
}

export default HomeMain;