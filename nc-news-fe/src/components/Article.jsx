import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Router } from '@reach/router';
import ArticleComments from './ArticleComments'


class Article extends Component {

    state = {
        article: {},
        isLoading: true,
        comments: []
    }

    fetchArticle = () => {
        return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}`)
    }



    componentDidMount() {
        // console.log('mounted')
        this.fetchArticle().then(res => {
            this.setState({ article: res.data.article, isLoading: false });
        });
    };

    IncreaseVote = () => {
        // console.log('hello')
        return Axios.patch(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}`, { inc_votes: 1 })
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('in component did update')
        // console.log(prevState, 'prevState')
        if (prevState.votes !== this.state.votes) {
            this.fetchArticle().then(res => {
                this.setState({ article: res.data.article, isLoading: false });
            });
        }
    }


    render() {
        // console.log(this.state, 'state')
        // console.log(this.props, 'article props')

        const { isLoading, article } = this.state

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
                        Current votes: {article.votes}<br></br><br></br>
                        <button className="vote-button" onClick={this.IncreaseVote}>{'😀'}</button>  <button className="vote-button">{'😞'}</button>


                        <br></br><br></br>
                        Comments: {article.comment_count}<br></br>
                        <Link to={`/articles/${article.article_id}/comments`} >View comments</Link>
                    </p>

                </ul>

            </div >
        );
    }
}

export default Article;