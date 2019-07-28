import React, {Component} from 'react';
import {loginUser} from '../helpers/Helpers';


export default class Login extends Component{

    state = {
        username: '',
        password: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async () => {
        await loginUser(this.state)
    }
    render() {
             return (
                <React.Fragment>
                            <input type="email" name="username" onChange={this.onChange} placeholder="email" />
                            <input type="password" name="password" onChange={this.onChange} placeholder="password" />
                            <button onClick={this.login}>Login</button>
                </React.Fragment>
             )
    }
}