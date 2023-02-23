import Drawing from './PFD/Drawing'
import Comments from './Comments/Comments'
import {Routes, Route} from 'react-router-dom';

const ProjectMain = ({toggleCommentModal, comments, project, team, documents}) => {

    return (
        <Routes>
            {documents.map((document, key) => {
                return (
                    <Route key={key} element={<Drawing appDocument={document} project={project} toggleCommentModal={toggleCommentModal} team={team}/>} path={`${document.documentName.replace(/\s+/g, '-')}`}/>
                )
            })}
            <Route element={<Comments comments={comments}/>} path='/comments'></Route>
        </Routes>
    )
}

export default ProjectMain