import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(logout())
    }

    const { user } = useSelector((state) => state.auth);


    return (
        <div>
            <div className="logo">
                <Link to="/">
                    <h1>Dashboard</h1>
                </Link>
            </div>
            
            <div className="SOMETHING">
                <h2>Hello Again!</h2>
                <p>Welcome {user.firstName} to our website again!</p>
                <p>Your email is: {user.email}</p>
                <button className="" onClick={signout}>Logout</button>
            </div>

        </div>
        
    )
}

export default Dashboard;
