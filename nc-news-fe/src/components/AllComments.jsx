import React, { Component } from 'react';

class AllComments extends Component {

    state = {
        comments: [],
        isLoading: true
    }

    fetchAllComments() {

    }

    render() {
        const { comments, isLoading } = this.state
        console.log(this.state, 'comments state')

        if (isLoading === true) {
            return <h2>Page Loading ...</h2>
        }
        return (
            <div>

            </div>
        );
    }
}

export default AllComments;