import React from 'react';
import styles from '../../styles/Project.module.css'

const SidebarRow = ({Icon, text}) => {
    return (
        <div className={styles.sidebarRow}>
            {<Icon />}
            <p>{text}</p>
        </div>
    );
};

export default SidebarRow;