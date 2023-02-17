import React from 'react';
import styles from './../../styles/Home.module.css'
import CloseIcon from '@mui/icons-material/Close';

const AddTeamModal = ({modal, toggleModal}) => {
    return (
        <>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay}>
                        <CloseIcon onClick={toggleModal} className={styles.formExitBtn}/>
                        <form>
                            <h2 className={styles.formTitle}>Start a new Group</h2>
                            <h3>Group Name</h3>
                            <input
                                type='text'
                                name='name'

                            />
                            <h3>Team Description</h3>
                            <textarea
                                cols='60'
                                rows='5'
                                name='description'
                            />
                            <h3>Team</h3>
                            <input
                                type='text'
                                name='team'
                            />
                            <button 
                                className={styles.addProjectButton}
                                onClick={(event) => {
                                    event.preventDefault();
                                    toggleModal();
                                }}
                            >Create New Group</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddTeamModal