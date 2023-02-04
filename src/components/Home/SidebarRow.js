import React from 'react';
import styles from '../../styles/Home.module.css'

const SidebarRow = ({Icon, text, handleClick}) => {
    return (
        <div className={styles.sidebarRow} onClick={handleClick}>
            {<Icon />}
            <h2>{text}</h2>
        </div>
    );
};

export default SidebarRow;