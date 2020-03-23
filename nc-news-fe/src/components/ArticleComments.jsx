import React, { Component } from 'react';
import Axios from 'axios'
import CommentForm from './CommentForm';
import moment from 'moment';
import * as api from '../api';
import ErrorPage from './ErrorPage'
import Button from 'react-bootstrap/Button'

class ArticleComments extends Component {

    state = {
        comments: [],
        isLoading: true,
        voteChange: 0,
        hasError: false,
        voteError: false,
        commentChange: 0
    }


    componentDidMount() {
        api.fetchCommentsPerID(this.props.article_id)
            .then(res => {
                this.setState({ comments: res.data.comments, isLoading: false });
            })
            .catch((err) => {
                this.setState({ isLoading: false, hasError: { msg: err.response.data.msg, status: err.response.data.status } })
            })
    }


    handleVoteUpdates = (num) => {
        api.handleCommentVoteUpdates(this.props.article_id, num)
            .then(res => {
                this.setState(currentState => {
                    return {
                        voteChange: currentState.voteChange + num
                    };
                });
            }).catch((err) => {
                this.setState({ voteError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }


    handleDelete = (comment_id) => {

        api.handlingDelete(comment_id)
            .then(res => {

                this.setState(currentState => {
                    return {
                        comments: currentState.comments.filter(comment => comment.comment_id !== comment_id)
                    }
                })
            }).catch((err) => {
                this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }

    postComment = (loggedInUser, body) => {

        return Axios.post(
            `https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}/comments`,
            { username: loggedInUser, body: body })

            .then(res => {
                this.setState(currentState => {
                    return { comments: [res.data.comment, ...currentState.comments] };
                });
            })
            .catch((err) => {
                this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    };


    render() {
        const { comments, isLoading, voteChange, voteError, hasError } = this.state
        const { loggedInUser } = this.props

        if (isLoading === true) {
            return <h2>Loading page...</h2>
        }
        if (hasError) {

            return <ErrorPage status={hasError.status} msg={hasError.msg} />
        }
        return (
            <div>

                {loggedInUser && (
                    < CommentForm postComment={this.postComment} loggedInUser={this.props.loggedInUser} />
                )}

                <br></br>

                <h3>All comments are below..</h3>

                <ul>
                    {comments.map(comment => {
                        return (
                            <li key={comment.comment_id}> <br></br>

                                <p> Comment by: {comment.author}<br></br>
                                    {comment.body}<br></br>
                                    ID: {comment.comment_id}<br></br>
                                    Commented at: {moment(comment.created_at).format('MMMM Do YYYY, h:mm a')}<br></br><br></br>

                                    Current votes: {comment.votes + voteChange}<br></br><br></br>
                                    Let us know what you thought of the comment by clicking on the buttons below...<br></br><br></br>

                                    {voteError !== false && <p>Error. can not vote</p>}
                                    <>
                                        <Button variant='success' disabled={voteChange !== 0} className="vote-button" onClick={() => this.handleVoteUpdates(1)}>{'😀'}</Button>{' '}</>  <><Button variant='danger' disabled={voteChange !== 0} className="vote-button" onClick={() => this.handleVoteUpdates(-1)}>{'😞'}</Button>{' '}</>
                                    <br></br><br></br>

                                    {loggedInUser &&
                                        <button onClick={() => this.handleDelete(comment.comment_id)} > Delete comment</button>
                                    }
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div >
        );
    }
}

export default ArticleComments;