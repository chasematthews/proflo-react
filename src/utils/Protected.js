import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'

const Protected = ({ children }) => {
    const {user} = UserAuth()
    const location = useLocation()
    if (!user) {
        return (<Navigate to='/login' replace state={{from: location}}/>)
    } else {
        return children
    }
}

export default Protected