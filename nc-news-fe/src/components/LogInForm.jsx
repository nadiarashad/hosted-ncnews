import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

class LogInForm extends Component {
    state = {
        username: '',
        loggedOut: false
    }

    handleInput = (field, input) => {
        this.setState({ [field]: input })
    }

    handleSubmit = (event) => {
        console.log('in handle submit')
        const { logInUser } = this.props
        const { username } = this.state

        event.preventDefault()

        logInUser(username)
        this.setState({ username: '', loggedOut: false })
    }

    clickLogout = () => {
        this.setState({ loggedOut: true })
    }


    render() {
        const { loggedInUser } = this.props
        const { loggedOut } = this.state



        return (
            <div>

                {loggedInUser === null || loggedOut === true ? (

                    <div>
                        <p>Not logged in</p>

                        <p>Log into your account here...</p>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Username:{' '}
                                <input
                                    type="text"
                                    value={this.state.username}

                                    onChange={event => { this.handleInput('username', event.target.value) }}
                                />
                                <button variant='dark' >Log in</button>
                            </label>
                        </form>
                    </div>


                ) : (

                        <div>
                            <p>Logged in user: {loggedInUser}</p>


                            <Button color="light" onClick={this.clickLogout}>
                                {loggedInUser ? 'Logout' : 'Login'}
                            </Button>

                        </div>

                    )
                }

            </div>

        );
    }
}

export default LogInForm;

