import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from './api';
import ErrorPage from './ErrorPage'

class Topics extends Component {

    state = {
        topics: [],
        isLoading: true,
        articles: [],
        hasError: false
    }

    componentDidMount() {

        api.fetchAllTopics()
            .then(res => {
                this.setState({ topics: res.data.topics, isLoading: false, articles: res.data.articles })
            }).catch((err) => {
                this.setState({ isLoading: false, hasError: { msg: err.response.data.msg, status: err.response.data.status } })

            })
    }

    render() {
        const { topics, isLoading, hasError } = this.state

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
                                <Link to={'/articles/'}><h2>{topic.slug}</h2></Link>
                                <p>
                                    {topic.description}

                                </p>

                            </li>
                        )
                    })
                    }

                </ul>
            </div>
        );
    }
}

export default Topics;