import React, { useEffect } from 'react';
import styles from './../styles/Login.module.css';
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { googleSignIn, user, logOut } = UserAuth()
    const navigate = useNavigate()

    const handleGoogleSignIn = async(event) => {
        event.preventDefault()
        try {
            await googleSignIn()
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(user != null) {
            navigate('/home')
        }
    }, [user])

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <div className={styles.profloLogoWrapper}>
                    <img 
                        src={require('./../images/proflo-logo.png')} 
                        alt={'ProFlo Logo'}
                        className={styles.profloLogo}
                    />
                </div>
                <h1>Welcome to ProFlo</h1>
                <h2>Please enter your login credentials</h2>
                <form>
                    <input 
                        type='text' 
                        name='email' 
                        placeholder='Email'
                    />
                    <input 
                        type='text' 
                        name='password' 
                        placeholder='Password'
                    />
                    <button className={styles.signInButtonStandard}>Sign in</button>
                    <button className={styles.signInButtonGoogle} onClick={(event) => handleGoogleSignIn(event)}>Sign in with Google</button>
                </form>           
            </div>
        </div>
    )
}

export default Login