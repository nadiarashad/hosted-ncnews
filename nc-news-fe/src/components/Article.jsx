import React, { Component } from 'react';
import Axios from 'axios';

class Article extends Component {

    state = {
        article: {},
        isLoading: true
    }

    fetchArticle = () => {
        return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}`)
    }


    componentDidMount = () => {
        console.log('mounted')
        this.fetchArticle().then(res => {
            this.setState({ article: res.data.article, isLoading: false });
        });
    };


    render() {
        console.log(this.state, 'state')
        console.log(this.props, 'props')

        const { isLoading, article } = this.state

        if (isLoading === true) {
            return <h1>Is Loading ...</h1>;
        }

        return (
            <div>
                <ul>
                    <h3>{article.title}</h3>
                    <p>
                        Author: {article.author} <br></br><br></br>
                        Topic: {article.topic}<br></br><br></br>
                        {article.body}<br></br><br></br>
                        Current votes: {article.votes}<br></br><br></br>
                        <button className="vote-button">{'😀'}</button>  <button className="vote-button">{'😞'}</button>


                        <br></br><br></br>
                        Comments: {article.comment_count}<br></br><br></br>


                    </p>
                </ul>


            </div>
        );
    }
}

export default Article;