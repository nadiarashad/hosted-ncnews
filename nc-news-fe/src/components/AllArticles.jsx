import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from '@reach/router';
import SortArticles from './SortArticles';
import moment from 'moment'


class AllArticles extends Component {

    state = {
        articles: [],
        isLoading: true,
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
        console.log('in handle sort')
        console.log(value)

        return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles?sort_by=${value}`)
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false })
            })
    }

    handleOrder = (value) => {
        console.log('in handle order')
        console.log(value)
        return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles?order=${value}`)
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false })
            })
    }

    filterArticles = (value) => {
        console.log(value.topic)

        console.log('in filterarticles')

        const topic = value.topic
        const author = value.author

        if (topic) {
            this.setState(currentState => {
                return {
                    articles: currentState.articles.filter(article => article.topic === topic)
                }
            })
        }

        if (author) {
            this.setState(currentState => {
                return {
                    articles: currentState.articles.filter(article => article.author === author)
                }
            })
        }
    }

    clearFilters = () => {
        this.componentDidMount()

    }


    render() {
        const { articles, isLoading } = this.state
        // console.log(this.state, 'state: articles')
        // console.log(this.props, 'allarticlesprops')
        if (isLoading === true) {
            return <p>Is Loading ...</p>;
        }

        return (
            <div >
                <br>
                </br>
                <h2>All articles</h2>
                <SortArticles handleSort={this.handleSort} handleOrder={this.handleOrder} filterArticles={this.filterArticles} clearFilters={this.clearFilters} />
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
                                    Created: {moment(article.created_at).format('MMMM Do YYYY, h:mm a')}<br></br><br></br>
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