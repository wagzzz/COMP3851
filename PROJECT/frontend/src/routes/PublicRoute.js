import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { authenticated } = useSelector((state) => state.auth);

    return (
        <div>
            <Route {...rest} render={props => !authenticated ? <Component {...props} /> :
                <Redirect to="/dashboard" />} />
        </div>
    );
}

export default PublicRoute;