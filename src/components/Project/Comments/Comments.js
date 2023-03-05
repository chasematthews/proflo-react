import React from 'react';
import styles from '../../../styles/Project.module.css'
import { useNavigate } from 'react-router-dom';

const Comments = ({comments, team, project, setDocSwitchLoading, docSwitchLoading}) => {

    const navigate = useNavigate()

    return (
        <div className={styles.main}>
            <h2>Comments Register</h2>
            <table className={styles.commentsTable}>
                <tbody>
                <tr>
                    <td width={'40%'}>Comment</td>
                    {team && <td width={'20%'}>Assigned To</td>}
                    <td width={'10%'}>Due Date</td>
                    <td width={'10%'}>Severity</td>
                    <td width={'10%'}>Identifier</td>
                    <td width={'10%'}>Document</td>
                </tr>
                    {comments.map((comment, key) => {
                        const navigateDoc = () => {
                            setDocSwitchLoading(!docSwitchLoading)
                            if (team !== undefined) {
                                navigate(`/projects/${project.name.replace(/\s+/g, '-')}/${comment.document.replace(/\s+/g, '-')}`)
                            } else {
                                navigate(`/${team.name.replace(/\s+/g, '-')}/${project.name.replace(/\s+/g, '-')}/${comment.document.replace(/\s+/g, '-')}`)
                            }
                        }
                        const linkStyle = {
                            cursor: "pointer",
                            fontWeight: "400",
                            color: "blue",
                            textDecoration: "underline"
                        }
                        return (
                            <tr key={key}>
                                <td>{comment.comment}</td>
                                {team && <td>{comment.assignedTo}</td>}
                                <td>{comment.dueDate}</td>
                                <td>{comment.severity}</td>
                                <td>{comment.ID}</td>
                                <td style={linkStyle} onClick={navigateDoc}>{comment.document}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Comments;