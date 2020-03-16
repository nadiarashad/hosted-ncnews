import React, { Component } from 'react';
import Axios from 'axios';

class Votes extends Component {

    state = {
        articles: []
    }

    fetchAllArticles = () => {
        return Axios.get('https://nc-news-heroku.herokuapp.com/api/articles/')
            .then(res => {
                this.setState({ articles: res.data.articles, isLoading: false });
            });
    }


    render() {
        const { articles } = this.state
        return (
            <div>
                <ul>

                </ul>

            </div>
        );
    }
}

export default Votes;