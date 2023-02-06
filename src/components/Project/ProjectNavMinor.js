import React from 'react'
import SidebarRow from '../Home/SidebarRow';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import ConstructionIcon from '@mui/icons-material/Construction';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import ForestIcon from '@mui/icons-material/Forest';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from '../../styles/Project.module.css'

const ProjectNavMinor = () => {

    const sidebarStyle = styles.sidebarRowMinor

    const designButtonsContent = [
        {icon: GridViewIcon, text: 'BFD', id: 'BFD'},
        {icon: TableRowsIcon, text: 'ST', id: 'ST'},
        {icon: AccountTreeIcon, text: 'PFDs', id: 'PFDs'},
        {icon: PropaneTankIcon, text: 'MEL', id: 'MEL'},
        {icon: ConstructionIcon, text: 'PDC', id: 'PDC'},
        {icon: MonetizationOnIcon, text: 'CAPEX', id: 'CAPEX'},
        {icon: FactoryIcon, text: 'OPEX', id: 'OPEX'},
        {icon: ForestIcon, text: 'ESG', id: 'ESG'},
        {icon: MoreHorizIcon, text: 'MORE', id: 'MORE'}
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
            </div>
        </div>
    )
}

export default ProjectNavMinor