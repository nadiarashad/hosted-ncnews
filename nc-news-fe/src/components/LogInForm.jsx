import React, { Component } from 'react';

class LogInForm extends Component {
    state = {
        username: '',
    }

    handleInput = (field, input) => {
        this.setState({ [field]: input })
    }

    handleSubmit = (event) => {
        const { logInUser } = this.props
        const { username } = this.state

        event.preventDefault()

        logInUser(username)
        this.setState({ username: '' })
    }


    render() {
        // console.log(this.state, 'satte')
        // console.log(this.props, 'props')
        const { loggedInUser } = this.props
        return (
            <div>

                {loggedInUser !== null ? (
                    <p>Logged in user: {loggedInUser}</p>
                ) : (
                        <p>Not logged in</p>
                    )}

                <p>Log into your account here...</p> <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:{' '}
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={event => { this.handleInput('username', event.target.value) }}
                        />
                        <button  >Log in</button>
                    </label>
                </form>
            </div>
        );
    }
}

export default LogInForm;