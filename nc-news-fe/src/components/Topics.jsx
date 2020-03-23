import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import ErrorPage from './ErrorPage'
import { Button } from 'react-bootstrap'
import styles from '../cssFiles/AllArticles.module.css'
import NC from '../images/nc.png'



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

    handleClick = (topic) => {

        api.handleTopicsByArticle(topic)
            .then(res => {
                this.setState({ articles: res.data.articles })
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
                <ul className={styles.AllArticles}>
                    {articles.map(article => {
                        return (
                            <li className={styles.Articles} key={article.article_id}>
                                <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
                                Author: {article.author} <br></br><br></br>

                            </li>
                        )
                    })}
                </ul>
            </div >



        );
    }
}

export default Topics;


