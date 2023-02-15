import Drawing from './PFD/Drawing'
import Comments from './Comments/Comments'
import {Routes, Route} from 'react-router-dom';

const ProjectMain = ({toggleCommentModal, comments, project}) => {

    return (
        <Routes>
            <Route element={<Drawing project={project} toggleCommentModal={toggleCommentModal}/>} path='/design'/>
            <Route element={<Comments comments={comments}/>} path='/comments'></Route>
        </Routes>
    )
}

export default ProjectMain