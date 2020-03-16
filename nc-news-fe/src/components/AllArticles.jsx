import React, { Component } from 'react';
import Axios from 'axios';
import styles from './AllArticles.module.css';
// import Votes from './votes'
import Article from './Article';
import { Link, Router } from '@reach/router';


class AllArticles extends Component {

    state = {
        articles: [],
        isLoading: true
    }

    fetchAllArticles = () => {
        return Axios.get('https://nc-news-heroku.herokuapp.com/api/articles/')

    }

    componentDidMount = () => {
        // console.log('mounted')
        this.fetchAllArticles().then(res => {
            this.setState({ articles: res.data.articles, isLoading: false });
        });
    };


    render() {

        const { articles, isLoading } = this.state

        // console.log(this.state, 'state: articles')
        if (isLoading === true) {
            return <p>Is Loading ...</p>;
        }


        return (
            <div >
                <br>
                </br>
                <h2>All articles</h2>
                <br></br>
                <ul className={StyleSheet.articleTable}>
                    {articles.map(article => {
                        return (

                            <li key={article.article_id}>
                                <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
                                <p>
                                    Author: {article.author}<br></br>
                                    ID: {article.article_id}<br></br>
                                    Topic: {article.topic} <br></br>
                                    Created: {article.created_at}<br></br><br></br>
                                    Current votes: {article.votes}
                                    {/* <button onClick = {}>{'😀'}</button>
                                    <button>{'😞'}</button> */}
                                </p>

                            </li>



                        )
                    })}


                </ul>


            </div>
        );
    }
}

export default AllArticles;