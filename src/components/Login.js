import 'antd/dist/antd.css';
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, message, Spin} from 'antd';
import {loginUser} from '../helpers/api';
import {Link} from 'react-router-dom';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class Login extends Component{

    state = {
        username: '',
        password: '',
        loading: false
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
                username: values.username,
                password: values.password,
                loading: true
            }, () => this.login());
          }
        });
      };

    login = async () => {
        try{
            let res = await loginUser(this.state);
            let user_data = res.data.data;
            localStorage.setItem('user_data', JSON.stringify(user_data));
            this.props.history.push({pathname: '/home', state: user_data});
        }
        catch (e){
            const error = new Error(e);
            message.error('Invalid Username/Password', 2);
            this.setState({loading: false});
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-form-wrapper">
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox className="text-align-left">Remember me</Checkbox>)}
                    {/* <a className="login-form-forgot" href="">
                        Forgot password
                    </a> */}
                    {this.state.loading ? <Spin indicator={antIcon} /> : 
                    
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    }
                    Or <Link to="/register">Register now!</Link>
                </Form.Item>
            </Form>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;