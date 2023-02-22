import React from 'react'
import styles from '@styles/Home.module.css'
import { UserAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const HomeHeader = ({headerStyle}) => {

    const { logOut, user } = UserAuth()

    const handleSignOut = async(event) => {
        event.preventDefault()
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={headerStyle}>
            <div className={styles.profloCompanyWrapper}>
                <div className={styles.profloLogoWrapper}>
                    <img
                        src={require('./../../images/proflo-logo.png')}
                        alt={'ProFlo Logo'}
                        className={styles.profloLogo}
                    />
                </div>
                <h1 className={styles.headerPageLogoTitle}>ProFlo</h1>
            </div>
            <div className={styles.userWrapper}>
                <div className={styles.profilePicWrapper}>
                    {user.photoURL && (
                        <img
                            referrerPolicy='no-referrer'
                            src={user.photoURL}
                            alt='Profile Pic'
                        />
                    )}
                </div>
                <h2 className={styles.userName}>{user.displayName}</h2>
                <button className={styles.signOutButton} onClick={handleSignOut}>SignOut</button>
            </div>
        </div>
    )
}

export default HomeHeader