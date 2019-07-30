import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Activation from './components/Activation';
import Home from './components/Home';
import WithAuth from './components/WithAuth';

const Routes = () => (
        <Switch>
            <Route exact path="/" component={Activation} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/home" component={WithAuth(Home)} />
        </Switch>
)

export default Routes;