import React, { Component } from 'react';
import Axios from 'axios'
import CommentForm from './CommentForm'

//need to add delete comment - only if jessjelly is the logged in user

class ArticleComments extends Component {

    state = {
        comments: [],
        isLoading: true,
        voteChange: 0,
        hasError: false
    }

    postComment = newComment => {
        console.log(newComment, 'newComment')
        const { username, body } = newComment
        return Axios.post(
            `https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}/comments`,
            { username, body })
            .then(res => {
                console.log(res, 'post res')
                // this.setState(currentState => {
                //     return { comments: [res.data.comment, ...currentState.comments] };
                // });
            })
            .catch((err) => {
                this.setState({ hasError: err, isLoading: false })
            })
    };


    fetchCommentsPerID = () => {
        console.log('fetchCommentsPerID')
        return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}/comments`)
    }

    componentDidMount() {
        console.log('in did update')
        this.fetchCommentsPerID()
            .then(res => {
                console.log(res, 'res')
                this.setState({ comments: res.data.comments, isLoading: false });
            })
            .catch((err) => {
                this.setState({ isLoading: false, hasError: err })
            })
    }


    handleVoteUpdates = (num) => {
        // console.log('in handle votes')
        return Axios.patch(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}`, { inc_votes: num })
            .then(res => {
                console.log(res, 'handlevote res')
                this.setState(prevState => {
                    return {
                        voteChange: prevState.voteChange + num
                    };
                });
            })
    }


    render() {
        // console.log('rendering')
        console.log(this.state, 'comments state')
        // console.log(this.props, 'comments props')

        const { comments, isLoading, voteChange } = this.state

        if (isLoading === true) {
            return <h2>Loading page...</h2>
        }
        return (
            <div>
                < CommentForm postComment={this.postComment} />

                <ul>
                    {comments.map(comment => {
                        return (
                            <li key={comment.comment_id}> <br></br>

                                <p> Comment by: {comment.author}<br></br>
                                    {comment.body}<br></br>
                                    ID: {comment.comment_id}<br></br>
                                    Commented at: {comment.created_at}<br></br><br></br>

                                    Current votes: {comment.votes + voteChange}<br></br><br></br>
                                    Let us know what you thought of the comment by clicking on the buttons below...<br></br><br></br>
                                    <button className="vote-button" onClick={() => this.handleVoteUpdates(1)}>{'😀'}</button>  <button className="vote-button" onClick={() => this.handleVoteUpdates(-1)}>{'😞'}</button>
                                </p>
                            </li>
                        )

                    })}

                </ul>
            </div>
        );
    }
}

export default ArticleComments;