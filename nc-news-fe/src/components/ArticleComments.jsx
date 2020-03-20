import React, { Component } from 'react';
import Axios from 'axios'
import CommentForm from './CommentForm';
import moment from 'moment';
import * as api from './api';
import ErrorPage from './ErrorPage'

class ArticleComments extends Component {

    state = {
        comments: [],
        isLoading: true,
        voteChange: 0,
        hasError: false,
        voteError: false
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
                this.setState(prevState => {
                    return {
                        voteChange: prevState.voteChange + num
                    };
                });
            }).catch((err) => {
                this.setState({ voteError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }


    handleDelete = (props) => {

        api.handlingDelete(props)
            .then(res => {

                this.setState(currentState => {
                    return {
                        comments: currentState.comments.filter(comment => comment.comment_id !== props)
                    }
                })
            }).catch((err) => {
                this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }

    postComment = newComment => {

        const { username, body } = newComment

        return Axios.post(
            `https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}/comments`,
            { username, body })

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
                                    <button disabled={voteChange !== 0} className="vote-button" onClick={() => this.handleVoteUpdates(1)}>{'😀'}</button>  <button disabled={voteChange !== 0} className="vote-button" onClick={() => this.handleVoteUpdates(-1)}>{'😞'}</button>
                                    <br></br><br></br>

                                    {loggedInUser && (
                                        < CommentForm postComment={this.state.postComment} />
                                    )}
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