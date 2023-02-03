import React from 'react';
import styles from '../../styles/Project.module.css'
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({modal, toggleModal, addProject}) => {
    return (
        <>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay}>
                        <CloseIcon onClick={toggleModal} className={styles.formExitBtn}/>
                        <form>
                            <h2 className={styles.formTitle}>Add a Project</h2>
                            <h3>Project Name</h3>
                            <input
                                type='text'
                                name='projectName'
                            />
                            <h3>Project Description</h3>
                            <textarea
                                cols='40'
                                rows='5'
                                name='projectDescription'
                            />
                            <h3>Client</h3>
                            <input
                                type='text'
                                name='client'
                            />
                            <h3>Capacity</h3>
                            <input
                                type='text'
                                name='capacity'
                            />
                            <h3>Raw Material</h3>
                            <input
                                type='text'
                                name='rawMaterial'
                            />
                            <h3>Product</h3>
                            <input
                                type='text'
                                name='product'
                            />
                            <h3>Level of Engineering</h3>
                            <input
                                type='text'
                                name='projectName'
                            />
                            <h3>Team</h3>
                            <input
                                type='text'
                                name='engineeringLevel'
                            />
                            <button 
                                className={styles.newProjectBtn}
                                onClick={(event) => addProject(event)}
                            >Create New Project</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal