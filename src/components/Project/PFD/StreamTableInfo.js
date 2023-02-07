import Papa from 'papaparse'
import react, { useState, useEffect } from 'react'

const StreamTableInfo = ({ streamNumber }) => {

    const [ MEBData, SetMEBData ] = useState()

    // console.log(streamNumber)

    async function fetchCSV() {
        SetMEBData((await Papa.parse(await (await fetch('./resources/PFD-MEB-v5.csv')).text())).data)
        // console.log(MEBData.data[0].indexOf(streamNumber.textContent))
        // console.log(Object.keys(MEBData.data).length)
        // console.log(MEBData)
    }

    useEffect(() => {        
        fetchCSV()
    }, [])

    return (
        <table>
            <tbody>
                {MEBData !== undefined &&
                    Object.keys(MEBData).map((key) => {
                        const parameterInfo = MEBData[key]
                        return (
                            <tr>
                                <td>{parameterInfo[0]}</td>
                                <td>{parameterInfo[MEBData[0].indexOf(streamNumber.textContent)]}</td>
                            </tr>
                        )
                        // console.log(parameterInfo[0])
                        // console.log(parameterInfo[MEBData[0].indexOf(streamNumber.textContent)])
                        // console.log(parameterInfo)
                        // console.log(MEBData[0].indexOf(streamNumber.textContent))
                        // console.log(MEBData[key])
                        // console.log(parameterInfo[0])
                        // return (
                        //     <table>
                        //         {Object.keys(MEBData).map((key) => {
                        //             console.log(parameterInfo[0])
                        //             // console.log(parameterInfo[key])
                        //             // console.log(stream)
                        //             return (
                        //                 <tr>
                        //                     {/* <td>{stream[0]}</td>
                        //                     <td>{stream[1]}</td> */}
                        //                 </tr>
                        //             )
                        //         })}
                        //     </table>
                        // )
                    })
                }
            </tbody>
        </table>
    )
}

export default StreamTableInfo