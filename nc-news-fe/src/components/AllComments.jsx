import React, { Component } from 'react';
import moment from 'moment'
import * as api from '../api'
import ErrorPage from './ErrorPage'


class AllComments extends Component {

    state = {
        comments: [],
        isLoading: true,
        hasError: false
    }

    componentDidMount() {
        api.fetchAllComments()
            .then(res => {
                this.setState({ comments: res.data.comments, isLoading: false })
            }).catch((err) => {
                this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }

    render() {
        const { comments, isLoading, hasError } = this.state

        if (isLoading === true) {
            return <h2>Page Loading ...</h2>
        }
        if (hasError) {

            return <ErrorPage status={hasError.status} msg={hasError.msg} />
        }
        return (
            <div>
                <h2>If you're nosey like we are, have a look through our article comments, you can add your own by looking through the articles section and clicking 'Post Comment'...</h2>
                <ul>
                    {comments.map(comment => {
                        return (
                            <li key={comment.comment_id}>

                                <h3>ID: {comment.comment_id}</h3>
                                <p>
                                    Author: {comment.author}<br></br><br></br>
                                    Comment: {comment.body}<br></br><br></br>
                                    Votes: {comment.votes}<br></br><br></br>
                                    created at: {moment(comment.created_at).format('MMMM Do YYYY, h:mm a')}<br></br><br></br>
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default AllComments;