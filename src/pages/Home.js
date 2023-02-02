import React from 'react';
import styles from './../styles/Home.module.css';

const HomePage = () => {
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
                    <button className={styles.signInButtonGoogle}>Sign in with Google</button>
                </form>           
            </div>
        </div>
    )
}

export default HomePage