import React, {useState, useRef} from 'react';
import styles from '../../styles/Home.module.css'
import SidebarRow from './SidebarRow';

//Import all of the required icons for the side bar
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';

const HomeNav = ({toggleProjectModalHandleClick}) => {

    const [companyLogo, setCompanyLogo] = useState();
    const buttonUploadRef = useRef()

    const addCompanyLogo = (event) => {
        event.preventDefault();
        buttonUploadRef.current.click();
    }

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
                    (<div>Hello</div>) :
                    (<div>
                        <button className={styles.uploadFileButton} onClick={addCompanyLogo}>Add File</button>
                        <input className={styles.uploadFileInput} ref={buttonUploadRef} type="file" />
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