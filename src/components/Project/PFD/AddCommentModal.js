import React from 'react';
import styles from '../../../styles/Project.module.css'
import CloseIcon from '@mui/icons-material/Close';

const AddCommentModal = ({comment, handleCommentChange, toggleCommentModal, initiateComment, onSubmitComment, modal, team}) => {

    return (
        <>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay}>
                        <CloseIcon onClick={toggleCommentModal} className={styles.formExitBtn}/>
                        <form>
                            <h2 className={styles.formTitle}>Add a Comment</h2>
                            <h3 className={styles.formLabel}>Comment</h3>
                            <textarea
                                cols='40'
                                rows='5'
                                name='comment'
                                value={comment.comment}
                                onChange={(event) => handleCommentChange(event)}
                                className={styles.formInput}                           
                            />
                            {team && <h3 className={styles.formLabel}>Assigned To</h3>}
                            {team && <input 
                                value={comment.assignedTo} 
                                name="assignedTo" 
                                list="assignedTo"
                                onChange={(event) => handleCommentChange(event)}     
                                className={styles.formInput}                           
                            />}
                            {team && <datalist id = "assignedTo">
                                {team.members.map((member, key) => {
                                    return (
                                        <option key={key} value={`${member.name}`}/>
                                    )
                                })}
                            </datalist>}
                            <h3 className={styles.formLabel}>Due Date</h3>
                            <input
                                type='date'
                                name='dueDate'
                                value={comment.dueDate}
                                onChange={(event) => handleCommentChange(event)}
                                className={styles.formInput}                           
                            />
                            <h3 className={styles.formLabel}>Severity</h3>
                            <input 
                                value={comment.severity}
                                name="severity" 
                                list="severity"
                                onChange={(event) => handleCommentChange(event)}      
                                className={styles.formInput}                                                     
                            />
                            <datalist id = "severity">
                                <option value="Low"/>
                                <option value="Medium"/>
                                <option value="High"/>
                            </datalist>
                            <button 
                                className={styles.formSubmitBtn}
                                onClick={onSubmitComment}
                            >Post Comment</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddCommentModal