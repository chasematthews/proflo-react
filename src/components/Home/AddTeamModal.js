import React, {useEffect, useRef} from 'react';
import styles from '@styles/Home.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { httpsCallable, getFunctions } from 'firebase/functions';

const AddTeamModal = ({modal, toggleModal, team, onChange, addTeam, setMembers, members, member, setMember}) => {

    const getUserUID = httpsCallable(getFunctions(), 'getUserUID');

    const memberRef = useRef();

    const addMember = async(event) => {
        event.preventDefault();
        await getUserUID({email: `${memberRef.current.value}`}).then(async(result) => {
            const UserUID = await result.data;
            const UserEmail = await memberRef.current.value;
            await setMember(member => ({
                ...member,
                email: UserEmail,
                UID: UserUID
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
                        <form>
                            <h2 className={styles.formTitle}>Start a new Group</h2>
                            <h3>Group Name</h3>
                            <input
                                type='text'
                                name='name'
                                value={team.name}
                                onChange={(event) => onChange(event)}
                                className={styles.addProjectInput}
                            />
                            <h3>Team Description</h3>
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
                                    <h3>Team</h3>
                                    <input
                                        type='text'
                                        name='member'
                                        placeholder='Member email'
                                        ref={memberRef}
                                        className={styles.addProjectInput}
                                    />
                                    <button
                                        className={styles.addProjectButton}
                                        onClick = {event => {
                                            addMember(event)
                                        }}
                                    >Add Member</button>
                                </div>
                                <div className={styles.membersListWrapper}>
                                    {members.map((member, key) => {
                                        if ( key > 0) {
                                            return (
                                                <h3 className={styles.memberWrapper} key={key}>{member.email}</h3>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                            <button 
                                className={styles.addProjectButton}
                                onClick={(event) => {
                                    addTeam(event)
                                }}
                            >Create New Group</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddTeamModal