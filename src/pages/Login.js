import React from 'react';
import styles from './../styles/Login.module.css';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {

    const { signIn } = useAuth();
    const { signOutUser } = useAuth();
    const { initFirebaseAuth } = useAuth()
    
    initFirebaseAuth();

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
                    <button className={styles.signInButtonGoogle} onClick={(event) => signIn(event)}>Sign in with Google</button>
                    <button className={styles.signInButtonGoogle} onClick={(event) => signOutUser(event)}>Sign out with Google</button>
                </form>           
            </div>
        </div>
    )
}

export default Login