import React from 'react';
import LogInForm from './LogInForm';
// import Logo from '../images/header.png'


const Header = ({ loggedInUser, logInUser }) => {
    return (
        <div>
            {/* <img className='headerbanner' src={Logo} alt='banner of newyork skyline' /> */}

            <br></br>
            <LogInForm loggedInUser={loggedInUser} logInUser={logInUser} />
            <br />
            <h1 className="title">NC - News</h1>
            <br></br>
        </div>
    );
};

export default Header;