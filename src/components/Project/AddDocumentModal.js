import React from 'react';
import styles from '@styles/Project.module.css'

const AddDocumentModal = ({document, handleDocumentChange, onSubmitDocument, modal}) => {
    return (
        <>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay}>
                        <form>
                            <h2 className={styles.formTitle}>Add a Document</h2>
                            <h3>Document Name</h3>
                            <textarea
                                cols='40'
                                rows='5'
                                name='documentName'
                                value={document.documentName}
                                onChange={(event) => handleDocumentChange(event)}
                            />
                            <h3>Document Type</h3>
                            <input
                                type='text'
                                name='documentType'
                                value={document.documentType}
                                onChange={(event) => handleDocumentChange(event)}
                            />
                            <button 
                                className={styles.newProjectBtn}
                                onClick={onSubmitDocument}
                            >Add Document</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddDocumentModal