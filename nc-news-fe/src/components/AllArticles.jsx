import React, { Component } from 'react';
import Axios from 'axios';
import styles from './AllArticles.module.css';
// import Votes from './votes'
// import Article from './Article';
import { Link, Router } from '@reach/router';
import SortArticles from './SortArticles'


class AllArticles extends Component {

    state = {
        articles: [],
        isLoading: true
    }

    fetchAllArticles = () => {
        return Axios.get('https://nc-news-heroku.herokuapp.com/api/articles/')

    }

    componentDidMount() {
        // console.log('mounted')
        this.fetchAllArticles().then(res => {
            this.setState({ articles: res.data.articles, isLoading: false });
        });
    };

    handleSort = (value) => {
        this.setState((currentState) => {
            return {
                articles: currentState.articles.sort(function (a, b) {

                    if (value === 'date_created') {
                        if (a[value] < b[value]) {
                            return -1
                        }
                        if (a[value] > b[value]) {
                            return 1
                        }
                        return 0
                    }
                    // if (value === 'comment_count' || value === 'votes') {
                    return a[value] - b[value]
                    // }
                })
            }
        })
    }


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
                <SortArticles handleSort={this.handleSort} />
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
                                    Current votes: {article.votes}<br></br>
                                    Comment count: {article.comment_count}
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