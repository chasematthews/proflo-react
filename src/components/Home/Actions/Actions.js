import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Project.module.css'
import { UserAuth } from '../../../contexts/AuthContext';
import { query, collection, onSnapshot } from 'firebase/firestore';

const ActionsRegister = ({comments}) => {

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
                    <td width={'10%'}>Identifier</td>
                    <td width={'20%'}>Document</td>
                </tr>
                    {actions.map((action) => {
                        return (
                            <tr>
                                <td>{action.comment}</td>
                                <td>{action.dueDate}</td>
                                <td>{action.severity}</td>
                                <td>{action.ID}</td>
                                <td>{action.document}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ActionsRegister;