import React, { Component } from 'react';
import { Link } from '@reach/router';
import SortArticles from './SortArticles';
import moment from 'moment'
import * as api from '../api';
import ErrorPage from './ErrorPage'
import styles from '../cssFiles/AllArticles.module.css'



class AllArticles extends Component {

    state = {
        articles: [],
        isLoading: true,
        hasError: false
    }

    componentDidMount() {
        api.fetchAllArticles().then(res => {

            this.setState({ articles: res.data.articles, isLoading: false });
        }).catch((err) => {

            this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
        })
    };

    handleSort = (value) => {
        api.handlingSort(value)
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false })
            }).catch((err) => {
                this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }

    handleOrder = (value) => {
        api.handlingOrder(value)
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false })
            }).catch((err) => {
                this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }

    filterArticles = (value) => {
        api.handleFilter(value)
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false })
            })
    }

    clearFilters = () => {
        this.componentDidMount()
    }


    render() {
        const { articles, isLoading, hasError } = this.state
        const { users } = this.props

        if (isLoading === true) {
            return <p>Is Loading ...</p>;
        }

        if (hasError) {
            return <ErrorPage status={hasError.status} msg={hasError.msg} />
        }

        return (
            <div >
                <br>
                </br>
                <h2>All articles</h2>
                <SortArticles handleSort={this.handleSort} handleOrder={this.handleOrder} filterArticles={this.filterArticles} clearFilters={this.clearFilters} users={users} />

                <br></br>
                <ul className={styles.AllArticles}>
                    {articles.map(article => {
                        return (
                            <li className={styles.Articles} key={article.article_id}>
                                <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
                                <p>
                                    Author: {article.author}<br></br>
                                    Topic: {article.topic} <br></br>
                                    Created: {moment(article.created_at).format('MMMM Do YYYY, h:mm a')}<br></br><br></br>
                                    Current votes: {article.votes}<br></br>
                                    Comment count: {article.comment_count}
                                </p>
                                <br></br> <br></br>
                            </li>

                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default AllArticles;