import React from 'react';
import styles from '../styles/Login.module.css'

const CustomGoogleButton = ({handleGoogleSignIn}) => {
    return (
        <button className={styles.googleButton} onClick={(event) => handleGoogleSignIn(event)}>
            <div className={styles.googleButtonContentWrapper}>
                <div className={styles.googleLogoWrapper}>
                    <img 
                        src={require('./../images/google-logo.png')}
                        alt={'Google Logo'}
                        className={styles.googleLogoImage}
                    />
                </div>
                <div className={styles.googleButtonTextWrapper}>
                    <h3 className={styles.googleButtonText}>Sign in with Google</h3>
                </div>
            </div>
        </button>
    )
}

export default CustomGoogleButton