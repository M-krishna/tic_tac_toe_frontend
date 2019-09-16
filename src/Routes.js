import 'antd/dist/antd.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import WrappedNormalLoginForm from './components/Login';
import WrappedRegistrationForm from './components/SignUp';
import Activation from './components/Activation';
import Home from './components/Home';
import Profile from './components/Profile';
import WithAuth from './components/WithAuth';
import Computer from './components/Computer';
import Friend from './components/Friend';
import JoinGame from './components/JoinGame';

const { Sider } = Layout;

const Routes = () => (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsed={true}>
                    <Navbar />
                </Sider>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Activation} />
                        <Route path="/login" component={WrappedNormalLoginForm} />
                        <Route path="/register" component={WrappedRegistrationForm} />
                        <Route path="/home" component={WithAuth(Home)} />
                        <Route path="/profile" component={WithAuth(Profile)} />
                        <Route path="/play/ai" component={WithAuth(Computer)} />
                        <Route path="/play/friend" component={WithAuth(Friend)} />
                        <Route path="/join/game" component={WithAuth(JoinGame)} />
                    </Switch>
                </Layout>
            </Layout>
        </div>
)

export default Routes;