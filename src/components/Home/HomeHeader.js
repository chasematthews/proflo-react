import React from 'react'
import styles from '../../styles/Home.module.css'
import { UserAuth } from '../../contexts/AuthContext'

const HomeHeader = () => {

    const { logOut } = UserAuth()

    const handleSignOut = async(event) => {
        event.preventDefault()
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.profloCompanyWrapper}>
                <div className={styles.profloLogoWrapper}>
                    <img
                        src={require('./../../images/proflo-logo.png')}
                        alt={'ProFlo Logo'}
                        className={styles.profloLogo}
                    />
                </div>
                <h1>ProFlo</h1>
            </div>
            <button onClick={handleSignOut}>SignOut</button>
        </div>
    )
}

export default HomeHeader