import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
            <div className="logo">
                <Link to="/">
                    <h1>Dashboard</h1>
                </Link>
            </div>

            <div className="auth-form login-form fade-in">
                <h2>Hello there!</h2>
                <p>You can register or login!</p>
                <Link to="/login?type=admin">
                    <button className="submit-button">Login as admin</button>
                </Link>
                <Link to="/login?type=user">
                    <button className="submit-button">Login as user</button>
                </Link>
                <Link to="/register">
                    <button className="submit-button">Register</button>
                </Link>
            </div>

        </div>
    )
}

export default Home