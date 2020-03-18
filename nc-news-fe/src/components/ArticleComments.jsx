import React, { Component } from 'react';
import Axios from 'axios'
import CommentForm from './CommentForm';
import moment from 'moment'

//need to add delete comment - only if jessjelly is the logged in user

class ArticleComments extends Component {

    state = {
        comments: [],
        isLoading: true,
        voteChange: 0,
        hasError: false,
        voteError: false
    }

    postComment = newComment => {
        console.log(newComment, 'newComment')
        const { username, body } = newComment
        return Axios.post(
            `https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}/comments`,
            { username, body })
            .then(res => {
                console.log(res, 'post res')
                this.setState(currentState => {
                    return { comments: [res.data.comment, ...currentState.comments] };
                });
            })
            .catch((err) => {
                this.setState({ hasError: err, isLoading: false })
            })
    };


    fetchCommentsPerID = () => {
        // console.log('fetchCommentsPerID')
        return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}/comments`)
    }

    componentDidMount() {
        // console.log('in did update')
        this.fetchCommentsPerID()
            .then(res => {
                // console.log(res, 'res')
                this.setState({ comments: res.data.comments, isLoading: false });
            })
            .catch((err) => {
                this.setState({ isLoading: false, hasError: err })
            })
    }


    handleVoteUpdates = (num) => {
        // console.log('in handle votes')
        return Axios.patch(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}/`, { inc_votes: num })
            .then(res => {
                // console.log(res, 'handlevote res')
                this.setState(prevState => {
                    return {
                        voteChange: prevState.voteChange + num
                    };
                });
            }).catch((err) => {
                this.setState({ voteError: err, isLoading: false })
            })
    }


    handleDelete = (props) => {
        console.log('in handle delete')

        return Axios.delete(`https://nc-news-heroku.herokuapp.com/api/comments/${props}`)
            .then(res => {
                console.log(res)
                this.setState(currentState => {
                    return {
                        comments: currentState.comments.filter(comment => comment.comment_id !== props)
                    }
                })
            })
    }


    render() {
        // console.log('rendering')
        // console.log(this.state, 'comments state')
        // console.log(this.props, 'comments props')

        const { comments, isLoading, voteChange, voteError } = this.state


        if (isLoading === true) {
            return <h2>Loading page...</h2>
        }
        return (
            <div>
                < CommentForm postComment={this.postComment} />
                <br></br>
                <h3>Otherwise, let's see what others have to say...</h3>
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


                                    <button onClick={() => this.handleDelete(comment.comment_id)} > Delete comment</button>
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