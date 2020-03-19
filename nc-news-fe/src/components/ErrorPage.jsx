import React from 'react';

const ErrorPage = (props) => {
    console.log(props)
    const { status, msg } = props
    return (
        <div>
            <p>Error: {status} {msg}</p>
        </div>
    );
};

export default ErrorPage;