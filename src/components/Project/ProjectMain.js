import Drawing from './PFD/Drawing'
import Comments from './Comments/Comments'
import {Routes, Route} from 'react-router-dom';

const ProjectMain = ({toggleCommentModal}) => {

    return (
        <Routes>
            <Route element={<Drawing toggleCommentModal={toggleCommentModal}/>} path='/design'/>
            <Route element={<Comments />} path='/comments'></Route>
        </Routes>
    )
}

export default ProjectMain