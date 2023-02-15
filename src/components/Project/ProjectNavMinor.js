import React, {useRef} from 'react'
import SidebarRow from '../Home/SidebarRow';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../styles/Project.module.css';
import { getFunctions, httpsCallable } from 'firebase/functions'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ProjectNavMinor = () => {

    const buttonUploadRef = useRef()

    const sidebarStyle = styles.sidebarRowMinor
    const PDFtoHTML = httpsCallable(getFunctions(), 'PDFtoHTML');

    const onMediaFileSelected = async(event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const filePath = `${getAuth().currentUser.uid}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        const publicImageUrl = await getDownloadURL(newImageRef)
        // if (userRef) {
        //     saveLogo(publicImageUrl, fileSnapshot)
        // }
        PDFtoHTML({ URL: publicImageUrl }).then(result => {console.log(result)})
    }

    const toggleUploadDialogue = (event) => {
        event.preventDefault();
        buttonUploadRef.current.click();
    }

    const designButtonsContent = [
        {icon: AccountTreeIcon, text: 'PFDs', id: 'PFDs'},
        {icon: AddIcon, text: 'Add', id: 'Add', handleClick: toggleUploadDialogue},
    ]

    return (
        <div className={styles.navigatorMinor}>
            <div className={styles.projectButtonsWrapper}>
                {designButtonsContent.map((designButtonContent) => {
                    return <SidebarRow 
                        Icon={designButtonContent.icon}
                        text={designButtonContent.text}
                        key={designButtonContent.id}
                        handleClick={designButtonContent.handleClick}
                        style={sidebarStyle}
                        />
                })}
                <input ref={buttonUploadRef} onChange={(event) => onMediaFileSelected(event)} type="file" />
            </div>
        </div>
    )
}

export default ProjectNavMinor