import React from 'react';
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
import { Link } from '@reach/router';

const PageNav = () => {
    return (
        <div className="header-grid">
            <Link to="/" className="nav-button" >Home</Link>
            <Link to="/articles" className="nav-button" >Articles</Link>
            <br></br>
            <br></br>
        </div>

    );
};

export default PageNav;

