import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Project.module.css'
import { UserAuth } from '../../../contexts/AuthContext';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ActionsRegister = ({docSwitchLoading, setDocSwitchLoading}) => {

    const navigate = useNavigate()

    const [actions, setActions] = useState([])

    const {userRef} = UserAuth();

    const loadActions = async() => {
        const actionsQuery = await query(collection(userRef, 'actions'))

        onSnapshot(actionsQuery, (snapshot) => {
            setActions(snapshot.docs.map(doc => doc.data()));
        })
    }

    useEffect(() => {
        loadActions();
    }, [])

    return (
        <div className={styles.main}>
            <h2>Actions Register</h2>
            <table className={styles.commentsTable}>
                <tbody>
                <tr>
                    <td width={'40%'}>Comment</td>
                    <td width={'10%'}>Due Date</td>
                    <td width={'10%'}>Severity</td>
                    <td width={'10%'}>Team</td>
                    <td width={'10%'}>Project</td>
                    <td width={'10%'}>Identifier</td>
                    <td width={'10%'}>Document</td>
                </tr>
                    {actions.map((action, key) => {
                        const navigateDoc = () => {
                            setDocSwitchLoading(!docSwitchLoading)
                            if (action.team === undefined) {
                                navigate(`/projects/${action.project.replace(/\s+/g, '-')}/${action.document.replace(/\s+/g, '-')}`)
                            } else {
                                navigate(`/${action.team.replace(/\s+/g, '-')}/${action.project.replace(/\s+/g, '-')}/${action.document.replace(/\s+/g, '-')}`)
                            }
                        }
                        const navigateTeam = () => {
                            navigate(`/${action.team.replace(/\s+/g, '-')}`)
                        }
                        const navigateProject = () => {
                            if (action.team === undefined) {
                                navigate(`/projects/${action.project.replace(/\s+/g, '-')}`)
                            } else {
                                navigate(`/${action.team.replace(/\s+/g, '-')}/${action.project.replace(/\s+/g, '-')}`)
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
                                <td>{action.comment}</td>
                                <td>{action.dueDate}</td>
                                <td>{action.severity}</td>
                                <td style={linkStyle} onClick={navigateTeam}>{action.team}</td>
                                <td style={linkStyle} onClick={navigateProject}>{action.project}</td>
                                <td>{action.ID}</td>
                                <td style={linkStyle} onClick={navigateDoc}>{action.document}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ActionsRegister;