import React from 'react';
import styles from '../../../styles/Project.module.css'

const Comments = ({comments}) => {
    return (
        <div className={styles.main}>
            <h2>Comments Register</h2>
            <table className={styles.commentsTable}>
                <tbody>
                <tr>
                    <td width={'60%'}>Comment</td>
                    <td width={'20%'}>Assigned To</td>
                    <td width={'10%'}>Due Date</td>
                    <td width={'10%'}>Severity</td>
                </tr>
                    {comments.map((comment) => {
                        return (
                            <tr>
                                <td>{comment.comment}</td>
                                <td>{comment.assignedTo}</td>
                                <td>{comment.dueDate}</td>
                                <td>{comment.severity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Comments;