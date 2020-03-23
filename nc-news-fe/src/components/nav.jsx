import React from 'react';
import { Link } from '@reach/router';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const PageNav = () => {
    return (


        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">NC-News</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/articles">Articles</Nav.Link>

                </Nav>

            </Navbar.Collapse>
        </Navbar>
    );
};

export default PageNav;