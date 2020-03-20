import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from './api';
import ErrorPage from './ErrorPage'


class Topics extends Component {

    state = {
        topics: [],
        isLoading: true,
        hasError: false,
        articles: [],
        gotArticles: null
    }

    componentDidMount() {

        api.fetchAllTopics()
            .then(res => {
                this.setState({ topics: res.data.topics, isLoading: false })
            }).catch((err) => {
                this.setState({ isLoading: false, hasError: { msg: err.response.data.msg, status: err.response.data.status } })
            })

    }

    handleClick = (value) => {
        const { articles } = this.props

        this.setState(currentState => {
            return { articles: articles.filter(article => article.topic === value), gotArticles: true }
        })

    }


    render() {
        const { topics, isLoading, hasError, articles } = this.state

        if (isLoading === true) {
            return <h1>is loading...</h1>
        }
        if (hasError) {
            return <ErrorPage status={hasError.status} msg={hasError.msg} />
        }
        return (
            <div>

                <ul>
                    {topics.map(topic => {
                        return (
                            <li key={topic.slug}>
                                <h2>{topic.slug}</h2>

                                <p>
                                    {topic.description}

                                </p>
                                <button value={topic.slug} onClick={e => this.handleClick(e.target.value)}>View all related articles here</button>
                            </li>
                        )
                    })
                    }
                </ul>
                <br></br><br></br>
                <ul>
                    {articles.map(article => {
                        return (
                            <li key={article.article_id}>
                                <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
                                Author: {article.author} <br></br><br></br>
                                Topic: {article.topic}<br></br><br></br>
                            </li>
                        )
                    })}
                </ul>


            </div >
        );
    }
}

export default Topics;