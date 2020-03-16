import React, { Component } from 'react';
import Axios from 'axios'
// import fetchCommentsPerID from './Article'

class GetArticleComments extends Component {

    state = {
        comments: [],
        isLoading: true
    }

    fetchCommentsPerID = () => {
        console.log('fetchCommentsPerID')
        return Axios.get(`https://nc-news-heroku.herokuapp.com/api/articles/${this.props.article_id}/comments`)

    }

    // componentDidUpdate() {
    //     console.log('in did update')
    //     this.props.fetchCommentsPerID()
    //         .then(res => {
    //             this.setState({ comments: res.data.comments, isLoading: false });
    //         })
    //         .catch(console.dir)
    // }



    render() {
        console.log(this.state, 'comments state')
        console.log(this.props, 'comments props')

        const { comments, isLoading } = this.state

        if (isLoading === true) {
            return <h2>Loading page...</h2>
        }
        return (
            <div>
                <p>comments here</p>
            </div>
        );
    }
}

export default GetArticleComments;