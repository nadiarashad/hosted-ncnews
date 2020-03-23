import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import ErrorPage from './ErrorPage'
import { Button } from 'react-bootstrap'
import styles from '../cssFiles/AllArticles.module.css'
import NC from '../images/nc.png'
import moment from 'moment'
import SortArticlesForm from './sortArticlesForm';
import OrderArticles from './OrderArticlesForm'


class Topics extends Component {

    state = {
        topics: [],
        isLoading: true,
        hasError: false,
        articles: []
    }

    componentDidMount() {

        api.fetchAllTopics()
            .then(res => {
                this.setState({ topics: res.data.topics, isLoading: false })
            })
            .catch((err) => {
                this.setState({ isLoading: false, hasError: { msg: err.response.data.msg, status: err.response.data.status } })
            })

        api.fetchAllArticles()
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false });
            })
            .catch((err) => {
                this.setState({ hasError: { msg: err.response.data.msg, status: err.response.data.status }, isLoading: false })
            })
    }

    handleClick = (topic) => {

        api.handleTopicsByArticle(topic)
            .then(res => {
                this.setState({ articles: res.data.articles })
            })
    }

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

    render() {
        console.log(this.state, 'articlesState')
        const { topics, isLoading, hasError, articles } = this.state

        if (isLoading === true) {
            return <h1>is loading...</h1>
        }
        if (hasError) {
            return <ErrorPage status={hasError.status} msg={hasError.msg} />
        }
        return (

            <div>

                <ul className={styles.AllArticles}>
                    {topics.map(topic => {
                        return (
                            <li border="primary" className={styles.Articles} key={topic.slug}>
                                <h3>{topic.slug}</h3>
                                <p>
                                    {topic.description}
                                </p>
                                <> <Button variant="success" value={topic.slug} onClick={e => this.handleClick(e.target.value)}>View all related articles below</Button>{' '} </>
                                <br></br>
                                <img src={NC} alt="banner" className="topicsImage" />
                                <br></br><br></br>
                            </li>
                        )
                    })
                    }
                </ul>
                <br></br> <br></br>
                <h2>Articles</h2>
                <SortArticlesForm handleSort={this.handleSort} />
                <OrderArticles handleOrder={this.handleOrder} />
                <ul className={styles.AllArticles}>
                    {articles.map(article => {
                        return (
                            <li className={styles.Articles} key={article.article_id}>
                                <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
                                Author: {article.author} <br></br><br></br>
                                Created: {moment(article.created_at).format('MMMM Do YYYY, h:mm a')}<br></br><br></br>
                                Current votes: {article.votes}<br></br>
                                Comment count: {article.comment_count}

                            </li>
                        )
                    })}
                </ul>
            </div >
        );
    }
}

export default Topics;


