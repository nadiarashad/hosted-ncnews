import React from 'react';
import Button from 'react-bootstrap/Button'

const LogInFormcomponent = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit()}>
                <label>
                    Username:{' '}
                    <input
                        type="text"
                        value={this.props.username}
                        onChange={event => { props.handleInput('username', event.target.value) }}
                    />
                    <Button variant='dark' >Log in</Button>{' '}
                </label>
            </form>
        </div>
    );
};

export default LogInFormcomponent;