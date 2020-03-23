import React, { Component } from 'react';



class AddComment extends Component {
    state = {
        // username: ' ',
        body: ''
    };

    handleInput = (field, input) => {
        console.log(field, input, 'inhandleinput')
        this.setState({ [field]: input });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { postComment, loggedInUser } = this.props;
        const { body } = this.state

        console.log(loggedInUser, body, 'in handle submit')
        postComment(loggedInUser, body);
        this.setState({ body: '' })
    };

    render() {
        console.log(this.props, 'props in commentform')

        // const { loggedInUser } = this.props
        return (
            <div>
                <h2>Have something to say? Add a comment here!</h2>
                <p>You will need to be logged in to post or delete a comment</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        {/* Username:{' '}
                        <input
                            value={this.state.username}
                            type="text"
                            onChange={event => {
                                this.handleInput('username', event.target.value);
                            }}
                        /> */}
                        Your comment here:{' '}
                        <input
                            value={this.state.body}
                            type="text"
                            onChange={event => {
                                this.handleInput('body', event.target.value);
                            }}
                        />
                        <button disabled={!this.state.body} type="submit" >Submit</button>
                        {/* this.state.username !== loggedInUser ||  */}
                    </label>
                </form>
            </div>

        );

    }
}

export default AddComment;
