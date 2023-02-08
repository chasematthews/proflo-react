import Papa from 'papaparse'
import React, { useState, useEffect } from 'react'
import styles from './../../../styles/Project.module.css'

const StreamTableInfo = ({ streamNumber }) => {

    const [ MEBData, SetMEBData ] = useState()

    async function fetchCSV() {
        SetMEBData((await Papa.parse(await (await fetch('./resources/PFD-MEB-v5.csv')).text())).data)
    }

    useEffect(() => {        
        fetchCSV()
    }, [])

    return (
        <table className={styles.streamTable}>
            <tbody>
                {MEBData !== undefined &&
                    Object.keys(MEBData).map((MEBItem, key) => {
                        const parameterInfo = MEBData[MEBItem]
                        return (
                            <tr key={key}>
                                <td className={styles.tableCell}>{parameterInfo[0]}</td>
                                <td className={styles.tableCell}>{parameterInfo[MEBData[0].indexOf(streamNumber.textContent)]}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default StreamTableInfo