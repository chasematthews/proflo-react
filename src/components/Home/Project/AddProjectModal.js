import React from 'react';
import styles from '../../../styles/Home.module.css'
import CloseIcon from '@mui/icons-material/Close';

const AddProjectModal = ({modal, toggleModal, addProject, project, onChange}) => {
    return (
        <>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay}>
                        <CloseIcon onClick={toggleModal} className={styles.formExitBtn}/>
                        <form>
                            <h2 className={styles.formTitle}>Add a Project</h2>
                            <h3 className={styles.formLabel}>Project Name</h3>
                            <input
                                type='text'
                                name='name'
                                value={project.name}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3 className={styles.formLabel}>Project Description</h3>
                            <textarea
                                cols='60'
                                rows='5'
                                name='description'
                                value={project.description}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3 className={styles.formLabel}>Client</h3>
                            <input
                                type='text'
                                name='client'
                                value={project.client}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3 className={styles.formLabel}>Capacity</h3>
                            <input
                                type='text'
                                name='capacity'
                                value={project.capacity}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3 className={styles.formLabel}>Raw Material</h3>
                            <input
                                type='text'
                                name='rawMaterial'
                                value={project.rawMaterial}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3 className={styles.formLabel}>Product</h3>
                            <input
                                type='text'
                                name='product'
                                value={project.product}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3 className={styles.formLabel}>Level of Engineering</h3>
                            <input
                                type='text'
                                name='projectStage'
                                value={project.projectStage}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3 className={styles.formLabel}>Team</h3>
                            <input
                                type='text'
                                name='team'
                                value={project.team}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <button 
                                className={styles.addProjectButton}
                                onClick={(event) => {
                                    addProject(event);
                                }}
                            >Create New Project</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddProjectModal