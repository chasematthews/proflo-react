import React, {useEffect, useState, useRef} from 'react';
import styles from '@styles/Home.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

const SidebarRow = ({Icon, text, handleClick, style, team, onClickBin, infoID, document}) => {

    const[clickFunction, setClickFunction] = useState({handleClick})
    const [optionsModal, setOptionsModal] = useState(false)

    const showOptionsButton = () => {
        (team || document) && setOptionsModal(true)
    }

    const hideOptionsButton = () => {
        setOptionsModal(false)
    }

    const cancelClickFunction = () => {
        setClickFunction(null)
    }

    const reinstateClickFunction = () => {
        setClickFunction({handleClick})
    }

    const optionsClick = () => {
        if (team) {
            onClickBin(infoID)
        } else if (document) {
            onClickBin(document.id)
        }
    }

    const clickButton = () => {
        if (clickFunction) {
            if (document) {
                clickFunction.handleClick(document.text)
            } else {
                clickFunction.handleClick()
            }
        }
    }

    return (
        <div className={style} onClick={clickButton} onMouseOver={showOptionsButton} onMouseOut={hideOptionsButton}>
            {<Icon />}
            <h2 className={styles.sideBarText}>{text}</h2>
            {optionsModal && <div className={styles.optionsBtnWrapper}><DeleteIcon onMouseOver={cancelClickFunction} onMouseOut={reinstateClickFunction} onClick={optionsClick} className={styles.moreOptions}/></div>}
        </div>
    );
};

export default SidebarRow;