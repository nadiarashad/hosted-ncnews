import React, { Component } from 'react';
import Axios from 'axios';

class AllComments extends Component {

    state = {
        comments: [],
        isLoading: true
    }

    fetchAllComments = () => {
        return Axios.get('https://nc-news-heroku.herokuapp.com/api/comments')
    }

    componentDidMount() {
        this.fetchAllComments()
            // this.fetchAllArticles()
            .then(res => {
                console.log(res, 'res')
                this.setState({ comments: res.data.comments, isLoading: false })
            })
    }

    render() {
        const { comments, isLoading } = this.state
        console.log(this.state, 'comments state')

        if (isLoading === true) {
            return <h2>Page Loading ...</h2>
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
                                    created at: {comment.created_at.slice(1)}<br></br><br></br>
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