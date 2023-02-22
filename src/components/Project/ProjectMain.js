import Drawing from './PFD/Drawing'
import Comments from './Comments/Comments'
import {Routes, Route} from 'react-router-dom';

const ProjectMain = ({toggleCommentModal, comments, project, team, documents}) => {

    return (
        <Routes>
            <Route element={<Drawing project={project} toggleCommentModal={toggleCommentModal} team={team}/>} path='/design'/>
            {documents.map((document, key) => {
                return (
                    <Route element={<Drawing document={document} project={project} toggleCommentModal={toggleCommentModal} team={team}/>} path={`${document.documentName.replace(/\s+/g, '-')}`}/>
                )
            })}
            <Route element={<Comments comments={comments}/>} path='/comments'></Route>
        </Routes>
    )
}

export default ProjectMain