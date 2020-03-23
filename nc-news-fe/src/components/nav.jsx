import React from 'react';
import { Link } from '@reach/router';

const PageNav = () => {
    return (
        <div className="header-grid">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <Link to="/" className="nav-button" >Home</Link>
            <Link to="/articles" className="nav-button" >Articles</Link>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>

    );
};

export default PageNav;

