import React from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button'

const SingleComment = (props) => {
    console.log(props, 'props in single comment')
    return (
        <div>
            <h3>All comments are below..</h3>
            <ul>
                {props.comments.map(comment => {
                    return (
                        <li key={comment.comment_id}> <br></br>

                            <p> Comment by: {comment.author}<br></br>
                                {comment.body}<br></br>
                                ID: {comment.comment_id}<br></br>
                                Commented at: {moment(comment.created_at).format('MMMM Do YYYY, h:mm a')}<br></br><br></br>

                                Current votes: {comment.votes + props.voteChange}<br></br><br></br>
                                Let us know what you thought of the comment by clicking on the buttons below...<br></br><br></br>

                                {props.voteError !== false && <p>Error. can not vote</p>}
                                <>
                                    <Button variant='success' disabled={props.voteChange !== 0} className="vote-button" onClick={() => props.handleVoteUpdates(1)}>{'😀'}</Button>{' '}</>  <><Button variant='danger' disabled={props.voteChange !== 0} className="vote-button" onClick={() => props.handleVoteUpdates(-1)}>{'😞'}</Button>{' '}</>
                                <br></br><br></br>

                                {props.loggedInUser &&
                                    <button onClick={() => props.handleDelete(comment.comment_id)} > Delete comment</button>
                                }
                            </p>
                        </li>
                    )
                })}
            </ul>

        </div>
    );
};

export default SingleComment;