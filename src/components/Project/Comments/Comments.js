import React from 'react';
import styles from '../../../styles/Project.module.css'

const Comments = ({comments}) => {
    console.log(comments)
    return (
        <div className={styles.main}>
            <h2>Comments Register</h2>
            <table className={styles.commentsTable}>
                <tbody>
                <tr>
                    <td width={'40%'}>Comment</td>
                    <td width={'20%'}>Assigned To</td>
                    <td width={'10%'}>Due Date</td>
                    <td width={'10%'}>Severity</td>
                    <td width={'10%'}>Identifier</td>
                    <td width={'10%'}>Document</td>
                </tr>
                    {comments.map((comment) => {
                        return (
                            <tr>
                                <td>{comment.comment}</td>
                                <td>{comment.assignedTo}</td>
                                <td>{comment.dueDate}</td>
                                <td>{comment.severity}</td>
                                <td>{comment.ID}</td>
                                <td>{comment.document}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Comments;