import React, { useEffect } from 'react';
import styles from './../styles/Login.module.css';
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const Login = () => {
    const { googleSignIn, user } = UserAuth()
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
            navigate('/')
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
                <h1 className={styles.title}>ProFlo</h1>
                <h2 className={styles.welcomeInstructions}>Don't have an account? Sign up</h2>
                <form className={styles.signInForm}>
                    <label className={styles.signInFormLabel}>Email address</label>
                    <input 
                        type='text' 
                        name='email' 
                        placeholder='Email'
                        className={styles.signInFormInput}
                    />
                    <label className={styles.signInFormLabel}>Password</label>
                    <input 
                        type='text' 
                        name='password' 
                        placeholder='Password'
                        className={styles.signInFormInput}
                    />
                    <button className={styles.signInFormButton}>Sign in</button>
                    <hr />
                    <GoogleButton onClick={(event) => handleGoogleSignIn(event)} />
                </form>           
            </div>
        </div>
    )
}

export default Login