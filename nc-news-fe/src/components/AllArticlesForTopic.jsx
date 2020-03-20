import React, { Component } from 'react';
import * as api from './api';
import ErrorPage from './ErrorPage'
import Topics from './Topics'


class AllArticlesForTopic extends Component {
    state = {
        isLoading: true,
        articles: [],
        hasError: false,
    }

    componentDidMount() {
        console.log('in did mount all articles for topic page')

    }

    filterArticles = (value) => {
        const topic = value.topic

        api.handleFilter(topic, 'topic')
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false })
            })

    }

    render() {

        const { articles, isLoading, hasError } = this.state
        console.log(this.props, 'props of all articles for topic')
        console.log(this.state, 'state of articles for topic')

        if (isLoading === true) {
            return <h1>is loading...</h1>
        }
        if (hasError) {

            return <ErrorPage status={hasError.status} msg={hasError.msg} />
        }
        return (
            <div>

                <p>Hello</p>

            </div>
        );
    }
}

export default AllArticlesForTopic;