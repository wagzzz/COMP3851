import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authenticated, user } = useSelector((state) => state.auth);

    return (
        <div>
            <Route {...rest} render={props => authenticated && user?.role === "user" ? 
            <>
                <Component {...props} /> 
            </>:
                <Redirect to="/login" />} />
        </div>
    );
}

export default PrivateRoute;