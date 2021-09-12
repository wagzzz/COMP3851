import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
    const { authenticated, user } = useSelector((state) => state.auth);

    return (
        <div>
            <Route {...rest} render={props => authenticated && user?.role === "admin" ? 
            <>
                <Component {...props} /> 
            </>:
                <Redirect to="/login" />} />
        </div>
    );
}

export default AdminRoute;