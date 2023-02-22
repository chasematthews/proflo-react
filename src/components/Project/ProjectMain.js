import Drawing from './PFD/Drawing'
import Comments from './Comments/Comments'
import {Routes, Route} from 'react-router-dom';

const ProjectMain = ({toggleCommentModal, comments, project, team}) => {

    return (
        <Routes>
            <Route element={<Drawing project={project} toggleCommentModal={toggleCommentModal} team={team}/>} path='/design'/>
            <Route element={<Comments comments={comments}/>} path='/comments'></Route>
        </Routes>
    )
}

export default ProjectMain