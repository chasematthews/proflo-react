import React from 'react';

const SidebarRow = ({Icon, text, handleClick, style}) => {

    return (
        <div className={style} onClick={handleClick}>
            {<Icon />}
            <h2>{text}</h2>
        </div>
    );
};

export default SidebarRow;