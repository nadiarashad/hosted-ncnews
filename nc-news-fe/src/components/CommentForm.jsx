import React, { Component } from 'react';


class AddComment extends Component {
    state = {
        body: ''
    };

    handleInput = (field, input) => {
        this.setState({ [field]: input });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { postComment, loggedInUser } = this.props;
        const { body } = this.state

        postComment(loggedInUser, body);
        this.setState({ body: '' })
    };

    render() {

        return (
            <div>
                <h2>Have something to say? Add a comment here!</h2>
                <p>You will need to be logged in to post or delete a comment</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Your comment here:{' '}
                        <input
                            value={this.state.body}
                            type="text"
                            onChange={event => {
                                this.handleInput('body', event.target.value);
                            }}
                        />
                        <button disabled={!this.state.body} type="submit" >Submit</button>
                    </label>
                </form>
            </div>
        );
    }
}

export default AddComment;
