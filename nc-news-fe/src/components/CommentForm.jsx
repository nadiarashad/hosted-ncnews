import React, { Component } from 'react';

//add comment only if logged in user is jessjelly

class AddComment extends Component {
    state = {
        username: '',
        body: '',

    };

    handleInput = (field, input) => {
        // console.log(field, input, 'field and input');
        this.setState({ [field]: input });
    };

    handleSubmit = event => {
        console.log('handlingsubmit')
        console.log(this.props)
        event.preventDefault();

        const { postComment } = this.props;

        postComment(this.state);
        this.setState({ username: '', body: '' })
    };

    render() {
        console.log(this.state, 'state of commentform')


        return (
            <div>
                <h2>Have something to say? Add a comment here!</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:{' '}
                        <input
                            value={this.state.username}
                            type="text"
                            onChange={event => {
                                this.handleInput('username', event.target.value);
                            }}
                        />
                        Your comment here:{' '}
                        <input
                            value={this.state.body}
                            type="text"
                            onChange={event => {
                                this.handleInput('body', event.target.value);
                            }}
                        />
                        <button type="submit">Submit</button>
                    </label>
                </form>
            </div>
        );
    }
}

export default AddComment;
