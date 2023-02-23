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
                            <h3>Comment</h3>
                            <textarea
                                cols='40'
                                rows='5'
                                name='comment'
                                value={comment.comment}
                                onChange={(event) => handleCommentChange(event)}
                            />
                            <h3>Assigned To</h3>
                            <input 
                                value={comment.assignedTo} 
                                name="assignedTo" 
                                list="assignedTo"
                                onChange={(event) => handleCommentChange(event)}                                
                            />
                            <datalist id = "assignedTo">
                                {team.members.map((member, key) => {
                                    return (
                                        <option key={key} value={`${member.name}`}/>
                                    )
                                })}
                            </datalist>
                            <h3>Due Date</h3>
                            <input
                                type='date'
                                name='dueDate'
                                value={comment.dueDate}
                                onChange={(event) => handleCommentChange(event)}
                            />
                            <h3>Severity</h3>
                            <input 
                                value={comment.severity}
                                name="severity" 
                                list="severity"
                                onChange={(event) => handleCommentChange(event)}                                
                            />
                            <datalist id = "severity">
                                <option value="Low"/>
                                <option value="Medium"/>
                                <option value="High"/>
                            </datalist>
                            <button 
                                className={styles.newProjectBtn}
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