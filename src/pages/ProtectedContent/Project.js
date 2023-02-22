import React, {useState, useEffect} from "react"
import HomeHeader from "../../components/Home/HomeHeader"
import ProjectMain from "../../components/Project/ProjectMain"
import ProjectNavMain from "../../components/Project/ProjectNavMain"
import ProjectNavMinor from "../../components/Project/ProjectNavMinor"
import AddCommentModal from "../../components/Project/PFD/AddCommentModal"
import AddDocumentModal from "../../components/Project/AddDocumentModal"
import styles from '@styles/Project.module.css'
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore'
import { UserAuth } from "../../contexts/AuthContext"

const Project = ({project, team}) => {

    const [comment, setComment] = useState({
        comment: '',
        assignedTo: '',
        dueDate: '',
        severity: '',
    });

    const [document, setDocument] = useState({
        documentName: '',
        documentType: '',
    })

    const {userRef} = UserAuth();
    // const { companyRef } = UserAuth();

    const [comments, setComments] = useState([]);
    const [commentModal, setCommentModal] = useState(false);

    const [documents, setDocuments] = useState([]);
    const [documentsModal, setDocumentsModal] = useState(false);

    console.log(documents)
    
    const toggleCommentModal = () => {
        setCommentModal(!commentModal)
    }

    const addComment = (event) => {
        event.preventDefault();

        setComments(
            comments.concat(comment)
        )

        toggleCommentModal()

        saveComment(comment)
    }

    const handleCommentChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setComment(comment => ({
            ...comment,
            [name]: value
        }))
    }

    const saveComment = async(comment) => {
        try {
            await addDoc(collection(userRef, 'comments'), {
                comment: comment.comment,
                assignedTo: comment.assignedTo,
                dueDate: comment.dueDate,
                severity: comment.severity,
            });
        }
        catch(error) {
            console.log('Error writing new project to Firebase Database');
        }
    }

    const loadComments = () => {
        const recentMessagesQuery = query(collection(userRef, 'comments'))
    
        onSnapshot(recentMessagesQuery, (snapshot) => {
            setComments(snapshot.docs.map(doc => doc.data()));
        })
    }

    const toggleDocumentModal = () => {
        setDocumentsModal(!documentsModal)
    }

    const addDocument = (event) => {
        event.preventDefault();

        setDocuments(
            documents.concat(document)
        )

        toggleDocumentModal()
    }

    const handleDocumentChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setDocument(document => ({
            ...document,
            [name]: value
        }))
    }    
    
    useEffect(() => {
        loadComments();
    }, [])

    const headerStyle = styles.header
    


    return (
        <div className={styles.container}>
            <HomeHeader
                headerStyle={headerStyle} 
            />
            <ProjectNavMain project={project} team={team}/>
            <ProjectNavMinor toggleDocumentModal={toggleDocumentModal} documents={documents}/>
            <ProjectMain toggleCommentModal={toggleCommentModal} comments={comments} project={project}/>
            <AddCommentModal 
                handleCommentChange = {handleCommentChange}
                comment = {comment}
                onSubmitComment = {addComment}
                modal = {commentModal}
                toggleCommentModal={toggleCommentModal}
            />
            <AddDocumentModal 
                handleDocumentChange={handleDocumentChange}
                document={document}
                onSubmitDocument={addDocument}
                modal={documentsModal}
                toggleDocumentModal={toggleDocumentModal}
            />
        </div>
    )
}

export default Project