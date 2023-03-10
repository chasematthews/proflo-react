import React, {useEffect, useRef} from 'react';
import styles from '@styles/Home.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { httpsCallable, getFunctions } from 'firebase/functions';
import {doc, getFirestore, getDoc} from 'firebase/firestore'

const AddTeamModal = ({modal, toggleModal, team, onChange, addTeam, setMembers, members, member, setMember}) => {

    const getUserUID = httpsCallable(getFunctions(), 'getUserUID');

    const memberRef = useRef();

    const addMember = async(event) => {
        event.preventDefault();
        await getUserUID({email: `${memberRef.current.value}`}).then(async(result) => {
            const UserUID = await result.data;
            const UserEmail = await memberRef.current.value;
            const UserName = await (await getDoc(doc(getFirestore(), 'users', `${UserUID}`))).data().name

            await setMember(member => ({
                ...member,
                email: UserEmail,
                UID: UserUID,
                name: UserName
            }));
        })
        memberRef.current.value='';
        onChange(event)
    }

    useEffect(() => {
        if (member.email !== "") {
            setMembers(members.concat(member))
        } 
    }, [member])

    return (
        <>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay}>
                        <CloseIcon onClick={toggleModal} className={styles.formExitBtn}/>
                        <form onSubmit={(event) => {addTeam(event)}}>
                            <h2 className={styles.formTitle}>Start a new Group</h2>
                            <h3 className={styles.formLabel}>Group Name</h3>
                            <input
                                type='text'
                                name='name'
                                value={team.name}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3 className={styles.formLabel}>Team Description</h3>
                            <textarea
                                cols='60'
                                rows='5'
                                name='description'
                                value={team.description}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <div className={styles.addMemberWrapper}>
                                <div className={styles.addMemberInputWrapper}>
                                    <h3 className={styles.formLabel}>Team</h3>
                                    <div className={styles.addMemberInputAndBtn}>
                                        <input
                                            type='text'
                                            name='member'
                                            placeholder='Member email'
                                            ref={memberRef}
                                            className={styles.addTeamInput}
                                        />
                                        <button
                                            className={styles.addTeamButton}
                                            onClick = {event => {
                                                addMember(event)
                                            }}
                                        >Add Member</button>
                                    </div>
                                    <div className={styles.membersListWrapper}>
                                        {members.map((member, key) => {
                                            if ( key > 0) {
                                                return (
                                                    <h3 className={styles.memberWrapper} key={key}>{member.name}</h3>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                            <button 
                                className={styles.addProjectButton}
                                type="submit"
                            >Create New Group</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddTeamModal