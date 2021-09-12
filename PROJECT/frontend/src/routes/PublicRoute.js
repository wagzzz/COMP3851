import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { authenticated, user } = useSelector((state) => state.auth);

    return (
        <div>
            <Route {...rest} render={props => !authenticated ? <Component {...props} /> :
                user?.role === "admin" ? <Redirect to="/admin/dashboard" /> : <Redirect to="/user/dashboard" />} />
        </div>
    );
}

export default PublicRoute;