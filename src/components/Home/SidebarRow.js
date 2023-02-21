import React from 'react';

const SidebarRow = ({Icon, text, handleClick, style, team}) => {

    // let btnClick

    // if (team !== undefined) {
    //     btnClick = handleClick(team)
    // } else {
    //     btnClick = handleClick
    // }

    return (
        <div className={style} onClick={handleClick}>
            {<Icon />}
            <h2>{text}</h2>
        </div>
    );
};

export default SidebarRow;