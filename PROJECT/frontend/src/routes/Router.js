import React from 'react';
import { HashRouter, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Login from '../components/Login';
import Register from '../components/Register';

import Dashboard from '../components/Dashboard';
import Home from '../components/Home';

const Router = () => {
    return (
        <HashRouter>
            <Switch>

                <PublicRoute path="/" component={Home} exact />
                <PublicRoute path="/login" component={Login} exact />
                <PublicRoute path="/register" component={Register} exact />

                <PrivateRoute path="/dashboard" component={Dashboard} exact />

                <Redirect to="/" />
            </Switch>
        </HashRouter>
    );
}

export default Router;