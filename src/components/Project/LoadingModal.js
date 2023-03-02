import React from "react"
import styles from '@styles/Project.module.css';

const LoadingModal = () => {

    return (
        <div className={styles.modal}>
            <div className={styles.overlay}>
                Processing Document. Please Wait a Moment.
            </div>
        </div>
    )
}

export default LoadingModal