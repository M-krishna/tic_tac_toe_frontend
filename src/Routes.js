import React from 'react';
import {Route, Switch} from 'react-router-dom';
import WrappedNormalLoginForm from './components/Login';
import WrappedRegistrationForm from './components/SignUp';
import Activation from './components/Activation';
import Home from './components/Home';
import WithAuth from './components/WithAuth';

const Routes = () => (
        <Switch>
            <Route exact path="/" component={Activation} />
            <Route exact path="/login" component={WrappedNormalLoginForm} />
            <Route exact path="/register" component={WrappedRegistrationForm} />
            <Route exact path="/home" component={WithAuth(Home)} />
        </Switch>
)

export default Routes;