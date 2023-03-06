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
import { useNavigate } from 'react-router-dom';
import LoadingModal from "../../components/Project/LoadingModal"

const Project = ({project, team, docSwitchLoading, setDocSwitchLoading}) => {

    const navigate = useNavigate();

    const [comment, setComment] = useState({
        comment: '',
        assignedTo: '',
        dueDate: '',
        severity: '',
        ID: '',
        document: '',
    });

    const initialDocumentState = {
        documentName: '',
        documentType: '',
        drawingURL: '',
        PDFURL: '',
        data: [],
    };

    const [document, setDocument] = useState(initialDocumentState)

    const {userRef} = UserAuth();
    // const { companyRef } = UserAuth();

    const [comments, setComments] = useState([]);
    const [commentModal, setCommentModal] = useState(false);

    const [documents, setDocuments] = useState([]);
    const [documentsModal, setDocumentsModal] = useState(false);

    const [activeDocument, setActiveDocument] = useState('');

    const[streamNumbersList, setStreamNumbersList] = useState([]);
    const[activeStreamNumbersList, setActiveStreamNumbersList] = useState([]);
    const[streamNumbersListText, setStreamNumbersListText] = useState([]);

    const[docLoading, setDocLoading] = useState(false)

    const initiateComment = (event) => {

        console.log(activeDocument)
        if (team !== undefined) {
            setComment(comment => ({
                ...comment,
                ID: event.target.id,
                team: team.name,
                document: activeDocument,
                project: project.name
            }))
        } else {
            setComment(comment => ({
                ...comment,
                ID: event.target.id,
                document: activeDocument,
                project: project.name
            }))
        }
        toggleCommentModal()
    }
    
    const toggleCommentModal = () => {
        setCommentModal(!commentModal)
    }

    const addComment = (event) => {
        event.preventDefault();

        console.log(comment)

        setComments(
            comments.concat(comment)
        )

        toggleCommentModal()

        saveComment(comment)

        saveCommentToUser(comment)
    }

    const handleCommentChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setComment(comment => ({
            ...comment,
            [name]: value
        }))
    }

    const saveCommentToUser = async(comment) => {
        if (team === undefined) {
            const assignedToRef = await userRef
            await addDoc(collection(assignedToRef, 'actions'), {
                comment: comment.comment,
                dueDate: comment.dueDate,
                severity: comment.severity,
                ID: comment.ID,
                document: comment.document,
                project: comment.project,
            })
        } else {
            const membersUID = team.members.map(member => member.UID)
            const membersNames = team.members.map(member => member.name)
            const assignedToUID = membersUID[membersNames.indexOf(comment.assignedTo)]
            const assignedToRef = await doc(getFirestore(), 'users', `${assignedToUID}`)
            await addDoc(collection(assignedToRef, 'actions'), {
                comment: comment.comment,
                dueDate: comment.dueDate,
                severity: comment.severity,
                ID: comment.ID,
                document: comment.document,
                project: comment.project,
                team: comment.team
            })
        }
    }

    const saveComment = async(comment) => {
        if (team !== null) { 
            const teamRef = await doc(getFirestore(), 'teams', `${team.id}`)
            const projectRef = await doc(teamRef, 'projects', `${project.name}`)
            await addDoc(collection(projectRef, 'comments'), {
                comment: comment.comment,
                assignedTo: comment.assignedTo,
                dueDate: comment.dueDate,
                severity: comment.severity,
                ID: comment.ID,
                document: comment.document,
                project: comment.project,
                team: comment.team
            });
        } 
        else {
            const projectRef = await doc(userRef, 'projects', `${project.name}`)
            await addDoc(collection(projectRef, 'comments'), {
                comment: comment.comment,
                assignedTo: comment.assignedTo,
                dueDate: comment.dueDate,
                severity: comment.severity,
                ID: comment.ID,
                document: comment.document
            });
        }
    }

    const loadComments = async() => {
        let projectRef
        if (team !== null) {
            const teamRef = await doc(getFirestore(), 'teams', `${team.id}`)
            projectRef = await doc(teamRef, 'projects', `${project.name}`)
        } else {
            projectRef = await doc(userRef, 'projects', `${project.name}`)
        }
        const commentQuery = await query(collection(projectRef, 'comments'))
    
        onSnapshot(commentQuery, (snapshot) => {
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

    useEffect(() => {
        if (activeDocument !== "" && docLoading === false) {
            navigate(`${activeDocument.replace(/\s+/g, '-')}`)
            setStreamNumbersList([]);
            setActiveStreamNumbersList([]);
            setStreamNumbersListText([]);
        }
    }, [docLoading])

    const headerStyle = styles.header

    return (
        <div className={styles.container}>
            <HomeHeader
                headerStyle={headerStyle} 
            />
            <div className={styles.bodyContent}>
                <ProjectNavMain 
                    project={project} 
                    team={team}
                    setStreamNumbersListText={setStreamNumbersListText}
                    setActiveStreamNumbersList={setActiveStreamNumbersList}
                    setStreamNumbersList={setStreamNumbersList}
                />
                <ProjectNavMinor 
                    project={project} 
                    team={team} 
                    toggleDocumentModal={toggleDocumentModal} 
                    documents={documents} 
                    setDocuments={setDocuments}
                    setStreamNumbersList={setStreamNumbersList}
                    setActiveStreamNumbersList={setActiveStreamNumbersList}
                    streamNumbersListText={streamNumbersListText}
                    setStreamNumbersListText={setStreamNumbersListText}
                    setDocSwitchLoading={setDocSwitchLoading}
                    docSwitchLoading={docSwitchLoading}
                    setActiveDocument={setActiveDocument}
                />
                <ProjectMain
                    toggleCommentModal={toggleCommentModal}
                    initiateComment={initiateComment}
                    documents={documents}
                    comments={comments}
                    project={project}
                    team={team}
                    setActiveDocument = {setActiveDocument}
                    streamNumbersList={streamNumbersList}
                    setStreamNumbersList={setStreamNumbersList}
                    activeStreamNumbersList={activeStreamNumbersList}
                    setActiveStreamNumbersList={setActiveStreamNumbersList}
                    streamNumbersListText={streamNumbersListText}
                    setStreamNumbersListText={setStreamNumbersListText}
                    setDocSwitchLoading={setDocSwitchLoading}
                    docSwitchLoading={docSwitchLoading}
                />
            </div>
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
                docLoading={docLoading}
                setDocLoading={setDocLoading}
                activeDocument={activeDocument}
                setActiveDocument={setActiveDocument}
                setDocSwitchLoading={setDocSwitchLoading}
                docSwitchLoading={docSwitchLoading}
                initialDocumentState={initialDocumentState}
            />
            {docLoading && (
                <LoadingModal />
            )}
        </div>
    )
}

export default Project