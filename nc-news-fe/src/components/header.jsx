import React from 'react';
import LogInForm from './LogInForm';


const Header = ({ loggedInUser, logInUser }) => {
    return (
        <div>
            <br></br>
            <LogInForm loggedInUser={loggedInUser} logInUser={logInUser} />
            <br />
            <h1 className="title">NC - News</h1>
        </div>
    );
};

export default Header;