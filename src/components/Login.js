import React, {Component} from 'react';
import {loginUser} from '../helpers/api';


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
        try{
            let res = await loginUser(this.state);
            let user_data = res.data.data;
            localStorage.setItem('user_data', JSON.stringify(user_data));
            this.props.history.push('/home');
        }
        catch (e){
            const error = new Error(e);
            console.log(error);
        }
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