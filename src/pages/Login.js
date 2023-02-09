import React, { useEffect } from 'react';
import styles from './../styles/Login.module.css';
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom';
import CustomGoogleButton from '../utils/GoogleButton';
import CustomMSButton from '../utils/MicrosoftButton';

const Login = () => {
    const { googleSignIn, MSSignIn, user } = UserAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoogleSignIn = async(event) => {
        event.preventDefault()
        try {
            await googleSignIn()
        } catch(error) {
            console.log(error)
        }
    }

    const handleMSSignIn = async(event) => {
        event.preventDefault()
        try {
            await MSSignIn()
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(user != null) {
            if (location.state?.from) {
                navigate(location.state.from)
            }
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
                    <CustomGoogleButton handleGoogleSignIn = {handleGoogleSignIn} />
                    <CustomMSButton handleMSSignIn = {handleMSSignIn} />
                </form>           
            </div>
        </div>
    )
}

export default Login