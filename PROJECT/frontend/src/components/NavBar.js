import React from 'react';
import { Link } from 'react-router-dom';


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