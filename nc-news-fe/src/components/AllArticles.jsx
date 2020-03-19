import React, { Component } from 'react';
import { Link } from '@reach/router';
import SortArticles from './SortArticles';
import moment from 'moment'
import * as api from './api'

class AllArticles extends Component {

    state = {
        articles: [],
        isLoading: true,
    }

    componentDidMount() {
        // console.log('mounted')
        api.fetchAllArticles().then(res => {
            this.setState({ articles: res.data.articles, isLoading: false });
        });
    };

    handleSort = (value) => {
        api.handlingSort(value)
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false })
            })
    }

    handleOrder = (value) => {
        api.handlingOrder(value)
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false })
            })
    }

    filterArticles = (value) => {
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