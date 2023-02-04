import React from 'react'
import styles from '../../styles/Home.module.css'

const HomeHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.profloLogoWrapper}>
                <img 
                    src={require('./../../images/proflo-logo.png')}
                    alt={'ProFlo Logo'}
                    className={styles.profloLogo}
                />
            </div>
            <h1>ProFlo</h1>
        </div>
    )
}

export default HomeHeader