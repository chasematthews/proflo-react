import React, {useState, useEffect} from "react"
import HomeHeader from "../components/Home/HomeHeader"
import ProjectMain from "../components/Project/ProjectMain"
import ProjectNavMain from "../components/Project/ProjectNavMain"
import ProjectNavMinor from "../components/Project/ProjectNavMinor"
import AddCommentModal from "../components/Project/PFD/AddCommentModal"
import styles from '../styles/Project.module.css'
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore'
import { UserAuth } from "../contexts/AuthContext"

const ProjectOne = ({project}) => {

    const [comment, setComment] = useState({
        comment: '',
        assignedTo: '',
        dueDate: '',
        severity: '',
    });

    const {userRef} = UserAuth();
    const { companyRef } = UserAuth();

    const [comments, setComments] = useState([]);
    const [commentModal, setCommentModal] = useState(false);
    
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
            await addDoc(collection(companyRef, 'comments'), {
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
        const recentMessagesQuery = query(collection(companyRef, 'comments'))
    
        onSnapshot(recentMessagesQuery, (snapshot) => {
            setComments(snapshot.docs.map(doc => doc.data()));
        })
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
            <ProjectNavMain project={project}/>
            <ProjectNavMinor />
            <ProjectMain toggleCommentModal={toggleCommentModal} comments={comments} project={project}/>
            <AddCommentModal 
                handleCommentChange = {handleCommentChange}
                comment = {comment}
                onSubmitComment = {addComment}
                modal = {commentModal}
                toggleCommentModal={toggleCommentModal}
            />
        </div>
    )
}

export default ProjectOne