import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Router } from '@reach/router';
import ArticleComments from './ArticleComments'


class Article extends Component {

    state = {
        article: {},
        isLoading: true,
        comments: [],
        voteChange: 0
    }


    fetchArticle = () => {
        return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}`)
    }

    componentDidMount() {
        // console.log('mounted')
        this.fetchArticle().then(res => {
            this.setState({ article: res.data.article, isLoading: false, voteChange: 0 });
        });
    };

    handleVoteUpdates = (num) => {
        // console.log('in handle votes')
        return Axios.patch(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}`, { inc_votes: num })
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
        // console.log(this.state, 'state')
        // console.log(this.props, 'article props')

        const { isLoading, article, voteChange } = this.state


        if (isLoading === true) {
            return <h1>Is Loading ...</h1>;
        }

        return (
            <div>
                <Router>
                    < ArticleComments path='/comments' />
                </Router>
                <ul>
                    <h3>{article.title}</h3>
                    <p>
                        Author: {article.author} <br></br><br></br>
                        Topic: {article.topic}<br></br><br></br>
                        {article.body}<br></br><br></br>
                        Current votes: {article.votes + voteChange}<br></br><br></br>
                        Let us know what you thought of this article by clicking on the buttons below...<br></br><br></br>
                        <button disable={voteChange !== 0} className="vote-button" onClick={() => this.handleVoteUpdates(1)}>{'😀'}</button>  <button disable={voteChange !== 0} className="vote-button" onClick={() => this.handleVoteUpdates(-1)}>{'😞'}</button>


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