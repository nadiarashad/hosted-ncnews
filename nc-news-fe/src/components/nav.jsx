import React from 'react';
import { Link } from '@reach/router';

const Nav = () => {
    return (
        <div className="header-grid">
            <Link className="nav-button" to="/">Home</Link>
            <Link className="nav-button" to="/articles">Articles</Link>
            <Link className="nav-button" to="/articles/: article_id/comments">Comments</Link>
            <Link className="nav-button" to="/topics">Topics</Link>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
};

export default Nav;