import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import { LinkContainer, Row, Column } from "react-router-bootstrap";



const NavBar = () => {

    return (
        <nav>
            <Link to="/">
                <h1>Dashboard</h1>
            </Link>
        </nav>
    )
}

export default NavBar