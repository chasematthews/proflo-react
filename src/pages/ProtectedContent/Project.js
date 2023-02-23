import React, {useState, useEffect} from "react"
import HomeHeader from "../../components/Home/HomeHeader"
import ProjectMain from "../../components/Project/ProjectMain"
import ProjectNavMain from "../../components/Project/ProjectNavMain"
import ProjectNavMinor from "../../components/Project/ProjectNavMinor"
import AddCommentModal from "../../components/Project/PFD/AddCommentModal"
import AddDocumentModal from "../../components/Project/AddDocumentModal"
import styles from '@styles/Project.module.css'
import { collection, addDoc, query, onSnapshot, setDoc, doc, getFirestore } from 'firebase/firestore'
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
        drawingURL: '',
        PDFURL: '',
        data: [],
    })

    const {userRef} = UserAuth();
    // const { companyRef } = UserAuth();

    const [comments, setComments] = useState([]);
    const [commentModal, setCommentModal] = useState(false);

    const [documents, setDocuments] = useState([]);
    const [documentsModal, setDocumentsModal] = useState(false);
    
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
    
    const loadDocuments = async () => {
        let projectRef
        if (team !== null) {
            const teamRef = await doc(getFirestore(), 'teams', `${team.id}`)
            projectRef = await doc(teamRef, 'projects', `${project.name}`)
        } else {
            projectRef = await doc(userRef, 'projects', `${project.name}`)
        }
        const docQuery = await query(collection(projectRef, 'documents'))
    
        onSnapshot(docQuery, (snapshot) => {
            setDocuments(snapshot.docs.map(doc => doc.data()));
        })
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
        loadDocuments();
    }, [])

    const headerStyle = styles.header
    
    return (
        <div className={styles.container}>
            <HomeHeader
                headerStyle={headerStyle} 
            />
            <ProjectNavMain project={project} team={team}/>
            <ProjectNavMinor toggleDocumentModal={toggleDocumentModal} documents={documents}/>
            <ProjectMain toggleCommentModal={toggleCommentModal} documents={documents} comments={comments} project={project} team={team}/>
            <AddCommentModal 
                handleCommentChange = {handleCommentChange}
                comment = {comment}
                onSubmitComment = {addComment}
                modal = {commentModal}
                toggleCommentModal={toggleCommentModal}
                team = {team}
                project = {project}
            />
            <AddDocumentModal 
                handleDocumentChange={handleDocumentChange}
                document={document}
                modal={documentsModal}
                toggleDocumentModal={toggleDocumentModal}
                setDocument={setDocument}
                documents={documents}
                setDocuments={setDocuments}
                team={team}
                project={project}
            />
        </div>
    )
}

export default Project