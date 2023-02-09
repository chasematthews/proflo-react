import React from 'react';
import styles from '../styles/Login.module.css'

const CustomMSButton = ({handleMSSignIn}) => {
    return (
        <button className={styles.MSButton} onClick={(event) => handleMSSignIn(event)}>
            <div className={styles.MSButtonContentWrapper}>
                <div className={styles.MSLogoWrapper}>
                    <img 
                        src={require('./../images/microsoft-logo.png')}
                        alt={'Microsoft Logo'}
                        className={styles.MSLogoImage}
                    />
                </div>
                <div className={styles.MSButtonTextWrapper}>
                    <h3 className={styles.MSButtonText}>Sign in with Microsoft</h3>
                </div>
            </div>
        </button>
    )
}

export default CustomMSButton