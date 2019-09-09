import React, {Component} from 'react';
import {signUpUser} from '../helpers/api'
import {Form, Icon, Input, Button, Tooltip} from 'antd';
import 'antd/dist/antd.css';

class SignUp extends Component{
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };

      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUp = async () => {
        try{
            await signUpUser(this.state)
        }
        catch (e){
            console.log(e)
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            validator: this.validateToNextPassword,
                        },
                        ],
                    })(<Input.Password />)}
                </Form.Item>

                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                        First Name&nbsp;
                        <Tooltip title="Whats your first name?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                        </span>
                    }
                    >
                    {getFieldDecorator('firstname', {
                        rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                        Last Name&nbsp;
                        <Tooltip title="whats your last name?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                        </span>
                    }
                    >
                    {getFieldDecorator('lastname', {
                        rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
                {/* <input type="text" onChange={this.onChange} name="first_name" placeholder="First Name"/>
                <input type="text" onChange={this.onChange} name="last_name" placeholder="Last Name" />
                <input type="email" onChange={this.onChange} name="email" placeholder="Email" />
                <input type="password" onChange={this.onChange} name="password" placeholder="Password" />
                <input type="password" onChange={this.onChange} name="confirm_password" placeholder="Confirm Password" />
                <button onClick={this.signUp}>Sign Up</button> */}
            </Form>
        )
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(SignUp);

export default WrappedRegistrationForm;