import React, {useState, useRef, useEffect} from 'react';
import styles from '../../styles/Home.module.css'
import SidebarRow from './SidebarRow';
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc, query, onSnapshot, getDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext';

//Import all of the required icons for the side bar
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';

const HomeNav = ({toggleProjectModalHandleClick, toggleTeamModalHandleClick, teams, setActiveTeam}) => {

    const { userRef } = UserAuth();
    // const { companyRef } = UserAuth();

    const navigate = useNavigate()

    const [companyLogo, setCompanyLogo] = useState();
    const [companyName, setCompanyName] = useState();
    const buttonUploadRef = useRef()
    const companyNameRef = useRef()


    const toggleUploadDialogue = (event) => {
        event.preventDefault();
        buttonUploadRef.current.click();
    }

    const onMediaFileSelected = async(event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const filePath = `${getAuth().currentUser.uid}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        const publicImageUrl = await getDownloadURL(newImageRef)
        if (userRef) {
            saveLogo(publicImageUrl, fileSnapshot)
        }
    }

    const addCompanyName = (event) => {
        event.preventDefault();
        saveCompanyName(companyNameRef);
    }

    const saveLogo = async(publicImageUrl, fileSnapshot) => {
        await setDoc(doc(userRef, 'general', 'logo'), {
            imageUrl: publicImageUrl,
            storageUri: fileSnapshot.metadata.fullPath
        });
    }

    const saveCompanyName = async(companyNameRef) => {
        await setDoc(doc(userRef, 'general', 'companyName'), {
            name: companyNameRef.current.value,
        });
    }

    const loadLogo = () => {
        const recentMessagesQuery = query(doc(userRef, 'general', 'logo'))

        onSnapshot(recentMessagesQuery, (snapshot) => {
            snapshot.data() && setCompanyLogo((snapshot.data().imageUrl));
        })
    }

    const loadCompanyName = () => {
        const recentMessagesQuery = query(doc(userRef, 'general', 'companyName'))
    
        onSnapshot(recentMessagesQuery, (snapshot) => {
            snapshot.data() && setCompanyName((snapshot.data().name));
        })
    }
   
    useEffect(() => {
        loadLogo();
        loadCompanyName();
    }, [])

    const sidebarStyle = styles.sidebarRow

    const homeButtonsContent = [
        {icon: ContentPasteIcon, text: 'Projects', id: 'Projects', handleClick: function() {navigate('/projects'); setActiveTeam('projects')}},
        {icon: CheckBoxIcon, text: 'Actions', id: 'Actions', handleClick: function() {navigate('/actions')}},
        {icon: AddIcon, text: 'New Project', id: 'New Project', handleClick: toggleProjectModalHandleClick},
        {icon: GroupsIcon, text: 'New Group', id: 'New Group', handleClick: toggleTeamModalHandleClick}
    ]

    const teamRender = teams.map(team => {
        return {icon: GroupsIcon, text: `${team.name}`, id: `${team.name}`, handleClick: function() {navigate(`/${team.name.replace(/\s+/g, '-')}`); setActiveTeam(`${team.id}`)}}
    })

    return (
        <div className={styles.navigator}>
            <div className={styles.companyNameWrapper}>
                {companyLogo ? 
                    (<div className={styles.companyLogoWrapper}><img src={`${companyLogo}`} alt='company logo' className={styles.companyLogoImage}/></div>) :
                    (<div className={styles.companyLogoWrapper}>
                        <button className={styles.uploadFileButton} onClick={(event) => toggleUploadDialogue(event)}>Add a Logo</button>
                        <input className={styles.uploadFileInput} ref={buttonUploadRef} onChange={(event) => onMediaFileSelected(event)} type="file" />
                    </div>
                    )   
                }
                {companyName ? 
                    (<div className={styles.companyName}>{companyName}</div>) :
                    (<form className={styles.companyNameForm} onSubmit={(event) => addCompanyName(event)}>
                        <label className={styles.companyNameFormLabel}>Company Name</label>
                        <div className={styles.inputWrapper}>
                            <input type='text' className={styles.companyNameInput} ref={companyNameRef}></input>
                            <button type='submit' className={styles.companyNameBtn}>OK</button>
                        </div>
                    </form>
                    )   
                }
                <hr />
            </div>
            <div className={styles.projectButtonsWrapperMain}>
                {homeButtonsContent.map((homeButtonContent) => {
                    return <SidebarRow
                        Icon={homeButtonContent.icon}
                        text={homeButtonContent.text}
                        key={homeButtonContent.id}
                        handleClick={homeButtonContent.handleClick}
                        style={sidebarStyle}
                        />
                })}
            </div>
            <hr></hr>
            <div className={styles.projectButtonsWrapperTeams}>
                {teamRender.map((team, key) => {
                    // console.log(teams)
                    return <SidebarRow
                        Icon={team.icon}
                        text={team.text}
                        key={team.id}
                        handleClick={team.handleClick}
                        style={sidebarStyle}
                    />
                })}
            </div>
        </div>
    )
}

export default HomeNav;