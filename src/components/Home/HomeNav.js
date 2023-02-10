import React, {useState, useRef, useEffect} from 'react';
import styles from '../../styles/Home.module.css'
import SidebarRow from './SidebarRow';
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { getFirestore, setDoc, doc, addDoc, collection, query, onSnapshot } from 'firebase/firestore';

//Import all of the required icons for the side bar
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';

const HomeNav = ({toggleProjectModalHandleClick}) => {

    const [companyLogo, setCompanyLogo] = useState();
    const buttonUploadRef = useRef()

    console.log(companyLogo)

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
        saveLogo(publicImageUrl, fileSnapshot)
    }

    const saveLogo = async(publicImageUrl, fileSnapshot) => {
        try {
            await setDoc(doc(getFirestore(), 'general', 'logo'), {
                imageUrl: publicImageUrl,
                storageUri: fileSnapshot.metadata.fullPath
            });
        }
        catch(error) {
            console.log('Error writing logo information to Firebase Database');
        }
    }

    const loadLogo = () => {
        const recentMessagesQuery = query(doc(getFirestore(), 'general', 'logo'))
    
        onSnapshot(recentMessagesQuery, (snapshot) => {
            setCompanyLogo((snapshot.data().imageUrl));
        })
      }
    
      useEffect(() => {
        loadLogo();
      }, [])

    const sidebarStyle = styles.sidebarRow

    const homeButtonsContent = [
        {icon: ContentPasteIcon, text: 'Projects', id: 'Projects'},
        {icon: CheckBoxIcon, text: 'Actions', id: 'Actions'},
        {icon: AddIcon, text: 'New Project', id: 'New Project', handleClick: toggleProjectModalHandleClick}
    ]

    return (
        <div className={styles.navigator}>
            <div className={styles.companyNameWrapper}>
                {companyLogo ? 
                    (<div className={styles.companyLogoWrapper}><img src={`${companyLogo}`} alt='company logo' className={styles.companyLogoImage}/></div>) :
                    (<div>
                        <button className={styles.uploadFileButton} onClick={(event) => toggleUploadDialogue(event)}>Add File</button>
                        <input className={styles.uploadFileInput} ref={buttonUploadRef} onChange={(event) => onMediaFileSelected(event)} type="file" />
                    </div>
                    )   
                }
            </div>
            <div className={styles.projectButtonsWrapper}>
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
        </div>
    )
}

export default HomeNav;