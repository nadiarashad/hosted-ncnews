import React, { Component } from 'react';
import CommentForm from './CommentForm';
import * as api from '../api';
import ErrorPage from './ErrorPage'
import SingleComment from './SingleComment'

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
        const { article_id } = this.props

        api.postComment(loggedInUser, body, article_id)
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
                <SingleComment comments={comments} voteError={voteError} voteChange={voteChange} handleVoteUpdates={this.handleVoteUpdates} handleDelete={this.handleDelete} />
            </div >
        );
    }
}

export default ArticleComments;