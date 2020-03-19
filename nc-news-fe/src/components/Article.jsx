import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import ArticleComments from './ArticleComments';
import * as api from './api'


class Article extends Component {

    state = {
        article: {},
        isLoading: true,
        comments: [],
        voteChange: 0
    }


    // fetchArticle = () => {
    //     return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}`)
    // }

    componentDidMount() {
        // console.log('mounted')
        api.fetchArticle(this.props.article_id).then(res => {
            this.setState({ article: res.data.article, isLoading: false, voteChange: 0 });
        });
    };

    handleVoteUpdates = (num) => {
        // console.log('in handle votes')
        // return Axios.patch(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}`, { inc_votes: num })

        api.fetchingVotes(this.props.article_id, num)
            .then(res => {
                // console.log(res, 'handlevote res')
                this.setState(prevState => {
                    return {
                        voteChange: prevState.voteChange + num
                    };
                });
            })
    }


    render() {
        const { isLoading, article, voteChange } = this.state
        const { validUser } = this.props

        if (isLoading === true) {
            return <h1>Is Loading ...</h1>;
        }

        return (
            <div>
                <Router>
                    < ArticleComments path='/comments' validUser={validUser} />
                </Router>
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

                </ul>

            </div >
        );
    }
}

export default Article;