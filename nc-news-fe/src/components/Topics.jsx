import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from '@reach/router';

class Topics extends Component {

    state = {
        topics: [],
        isLoading: true,
        articles: []
    }

    // fetchAllArticles = () => {
    //     return Axios.get('https://nc-news-heroku.herokuapp.com/api/articles/')
    // }

    fetchAllTopics = () => {
        return Axios.get("https://nc-news-heroku.herokuapp.com/api/topics")
    }

    componentDidMount() {
        this.fetchAllTopics()
            // this.fetchAllArticles()
            .then(res => {
                console.log(res, 'res')
                this.setState({ topics: res.data.topics, isLoading: false, articles: res.data.articles })
            })
    }


    render() {
        console.log(this.state, 'topics state')
        console.log(this.props, 'props')
        const { topics, isLoading } = this.state

        if (isLoading === true) {
            return <h1>is loading...</h1>
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