import React, {useEffect} from 'react'
import Drawing from './PFD/Drawing'
import Comments from './Comments/Comments'
import {Routes, Route} from 'react-router-dom';

const ProjectMain = ({activeStreamNumbersDivList, setActiveStreamNumbersDivList, streamNumbersDivList, setStreamNumbersDivList, toggleCommentModal, initiateComment, comments, project, team, documents, setActiveDocument, streamNumbersList, setStreamNumbersList, activeStreamNumbersList, setActiveStreamNumbersList, streamNumbersListText, setStreamNumbersListText, setDocSwitchLoading, docSwitchLoading}) => {

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
                        toggleCommentModal={toggleCommentModal} 
                        setStreamNumbersList={setStreamNumbersList}
                        streamNumbersList={streamNumbersList}
                        activeStreamNumbersList={activeStreamNumbersList}
                        setActiveStreamNumbersList={setActiveStreamNumbersList}
                        streamNumbersListText={streamNumbersListText}
                        setStreamNumbersListText={setStreamNumbersListText}
                        setDocSwitchLoading={setDocSwitchLoading}
                        docSwitchLoading={docSwitchLoading}
                        streamNumbersDivList={streamNumbersDivList}
                        setStreamNumbersDivList={setStreamNumbersDivList}
                        activeStreamNumbersDivList={activeStreamNumbersDivList}
                        setActiveStreamNumbersDivList={setActiveStreamNumbersDivList}
                    />} path={`${document.documentName.replace(/\s+/g, '-')}`}/>
                )
            })}
            <Route element={<Comments 
                                team={team} 
                                project={project} 
                                comments={comments}
                                setDocSwitchLoading={setDocSwitchLoading}
                                docSwitchLoading={docSwitchLoading}
                            />} path='/comments'></Route>
        </Routes>
    )
}

export default ProjectMain