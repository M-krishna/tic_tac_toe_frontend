import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Activation from './components/Activation';

const Routes = () => (
        <Switch>
            <Route exact path="/" component={Activation} />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={SignUp}></Route>
        </Switch>
)

export default Routes;