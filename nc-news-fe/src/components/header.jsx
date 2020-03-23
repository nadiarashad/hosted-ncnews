import React from 'react';
import LogInForm from './LogInForm';




const Header = ({ loggedInUser, logInUser }) => {
    return (
        <div className='HeaderBackground' >
            <br></br>
            <br></br>
            <LogInForm loggedInUser={loggedInUser} logInUser={logInUser} />
            <br />
            <h1 >Northcoders News</h1>
            <br></br>
        </div>
    );
};

export default Header;