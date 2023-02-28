import React, {useEffect} from 'react'
import Drawing from './PFD/Drawing'
import Comments from './Comments/Comments'
import {Routes, Route} from 'react-router-dom';

const ProjectMain = ({toggleCommentModal, initiateComment, comments, project, team, documents, setActiveDocument, streamNumbersList, setStreamNumbersList, activeStreamNumbersList, setActiveStreamNumbersList, streamNumbersListText, setStreamNumbersListText}) => {

    return (
        <Routes>
            {documents.map((document, key) => {
                return (
                    <Route key={key} element={<Drawing 
                        project={project} 
                        team={team} 
                        initiateComment = {initiateComment} 
                        setActiveDocument={setActiveDocument} 
                        appDocument={document} 
                        project={project} 
                        toggleCommentModal={toggleCommentModal} 
                        team={team}
                        setStreamNumbersList={setStreamNumbersList}
                        streamNumbersList={streamNumbersList}
                        activeStreamNumbersList={activeStreamNumbersList}
                        setActiveStreamNumbersList={setActiveStreamNumbersList}
                        streamNumbersListText={streamNumbersListText}
                        setStreamNumbersListText={setStreamNumbersListText}
                    />} path={`${document.documentName.replace(/\s+/g, '-')}`}/>
                )
            })}
            <Route element={<Comments comments={comments}/>} path='/comments'></Route>
        </Routes>
    )
}

export default ProjectMain