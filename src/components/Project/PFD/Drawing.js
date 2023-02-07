import React, {useState, useEffect} from 'react';
import styles from '../../../styles/Project.module.css'

const Drawing = () => {
    const[htmlFileString, setHtmlFileString] = useState();

    async function fetchHtml() {
        setHtmlFileString(await ( await fetch('./resources/drawing.html')).text());
    }

    useEffect(() => {
        fetchHtml()
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.PFDWrapper} dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
        </div>
    )
}

export default Drawing