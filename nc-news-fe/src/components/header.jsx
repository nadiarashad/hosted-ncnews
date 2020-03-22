import React from 'react';
import LogInForm from './LogInForm';
// import Logo from '../images/header.png'


const Header = ({ loggedInUser, logInUser }) => {
    return (
        <div>

            <br></br>
            <LogInForm loggedInUser={loggedInUser} logInUser={logInUser} />
            <br />
            <h1 className="title">Northcoders News</h1>
            <br></br>
        </div>
    );
};

export default Header;