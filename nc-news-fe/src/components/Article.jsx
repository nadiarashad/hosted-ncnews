import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import ArticleComments from './ArticleComments';
import * as api from './api'
import ErrorPage from './ErrorPage'

class Article extends Component {

    state = {
        article: {},
        isLoading: true,
        comments: [],
        voteChange: 0,
        hasError: false,

    }

    componentDidMount() {
        api.fetchArticle(this.props.article_id).then(res => {
            this.setState({ article: res.data.article, isLoading: false, voteChange: 0 });
        }).catch((err) => {
            console.dir(err, 'article err')
            this.setState({ hasError: { msg: err.response.data.msg, status: err.response.status }, isLoading: false })
        })
    };

    handleVoteUpdates = (num) => {

        api.fetchingVotes(this.props.article_id, num)
            .then(res => {
                this.setState(currentState => {
                    return {
                        voteChange: currentState.voteChange + num
                    };
                });
            })
            .catch((err) => {
                this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }

    render() {
        const { isLoading, article, voteChange, hasError } = this.state

        if (isLoading === true) {
            return <h1>Is Loading ...</h1>;
        }
        if (hasError) {
            return <ErrorPage status={hasError.status} msg={hasError.msg} />
        }

        return (
            <div>

                <ul>
                    <h3>{article.title}</h3>
                    <p>
                        Author: {article.author} <br></br><br></br>
                        Topic: {article.topic}<br></br><br></br>
                        {article.body}<br></br><br></br>
                        Current votes: {article.votes + voteChange}<br></br><br></br>
                        Let us know what you thought of this article by clicking on the buttons below...<br></br><br></br>
                        <button disabled={voteChange !== 0} onClick={() => this.handleVoteUpdates(1)}>{'😀'}</button>  <button disabled={voteChange !== 0} onClick={() => this.handleVoteUpdates(-1)}>{'😞'}</button>

                        <br></br><br></br>
                        Comments: {article.comment_count}<br></br><br></br>
                        <Link to={`/articles/${article.article_id}/comments`} >View comments</Link>
                    </p>
                    <Router>
                        <ArticleComments path="/comments" loggedInUser={this.props.loggedInUser} isLoggedIn={this.props.isLoggedIn} />
                    </Router>

                </ul>
            </div >
        );
    }
}

export default Article;