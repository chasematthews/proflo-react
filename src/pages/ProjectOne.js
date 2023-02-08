import React, {useState} from "react"
import HomeHeader from "../components/Home/HomeHeader"
import ProjectMain from "../components/Project/ProjectMain"
import ProjectNavMain from "../components/Project/ProjectNavMain"
import ProjectNavMinor from "../components/Project/ProjectNavMinor"
import AddCommentModal from "../components/Project/PFD/AddCommentModal"
import styles from '../styles/Project.module.css'

const ProjectOne = ({project}) => {

    const [comment, setComment] = useState({
        comment: '',
        assignedTo: '',
        dueDate: '',
        severity: '',
    });
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
    }

    const handleCommentChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setComment(comment => ({
            ...comment,
            [name]: value
        }))
    }

    const headerStyle = styles.header

    return (
        <div className={styles.container}>
            <HomeHeader
                headerStyle={headerStyle} 
            />
            <ProjectNavMain project={project}/>
            <ProjectNavMinor />
            <ProjectMain toggleCommentModal={toggleCommentModal} />
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