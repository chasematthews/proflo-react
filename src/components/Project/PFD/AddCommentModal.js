import React from 'react';
import styles from '../../../styles/Project.module.css'

const AddCommentModal = ({comment, handleCommentChange, onSubmitComment, modal}) => {
    return (
        <>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay}>
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
                                type='text'
                                name='assignedTo'
                                value={comment.assignedTo}
                                onChange={(event) => handleCommentChange(event)}
                            />
                            <h3>Due Date</h3>
                            <input
                                type='date'
                                name='dueDate'
                                value={comment.dueDate}
                                onChange={(event) => handleCommentChange(event)}
                            />
                            <h3>Severity</h3>
                            <input
                                type='text'
                                name='severity'
                                value={comment.severity}
                                onChange={(event) => handleCommentChange(event)}
                            />
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