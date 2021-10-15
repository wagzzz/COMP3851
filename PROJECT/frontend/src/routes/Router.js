import React from 'react';
import { HashRouter, Redirect, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';

import Login from '../components/Login';
import Register from '../components/Register';

import Home from '../components/Home';
import UserDashboard from '../components/User/UserDashboard';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminDegreePlan from '../components/Admin/DegreePlan/AdminDegreePlan';
import UserDegreePlan from "../components/User/DegreePlan/UserDegreePlan";

const Router = () => {
    return (
        <HashRouter>
            <Switch>

                <PublicRoute path="/" component={Home} exact />
                <PublicRoute path="/login" component={Login} exact />
                <PublicRoute path="/register" component={Register} exact />

                <PrivateRoute path="/user/dashboard" component={UserDashboard} exact />
                <PrivateRoute path="/user/degreePlan/:degreePlanId" component={UserDegreePlan} exact />
                <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
                <AdminRoute path="/admin/degree/:degreeId" component={AdminDegreePlan} exact />

                <Redirect to="/" />
            </Switch>
        </HashRouter>
    );
}



export default Router;