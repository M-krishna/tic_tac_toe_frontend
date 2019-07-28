import React, {Component} from 'react';
import {signUpUser} from '../helpers/Helpers'

export default class SignUp extends Component{
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUp = async () => {
        await signUpUser(this.state)
    }
    render(){
        return(
            <React.Fragment>
                <input type="text" onChange={this.onChange} name="first_name" placeholder="First Name"/>
                <input type="text" onChange={this.onChange} name="last_name" placeholder="Last Name" />
                <input type="email" onChange={this.onChange} name="email" placeholder="Email" />
                <input type="password" onChange={this.onChange} name="password" placeholder="Password" />
                <input type="password" onChange={this.onChange} name="confirm_password" placeholder="Confirm Password" />
                <button onClick={this.signUp}>Sign Up</button>
            </React.Fragment>
        )
    }
}