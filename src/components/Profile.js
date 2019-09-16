import React, {Component} from 'react';
import { Card } from 'antd';
import ProfileIcon from './ProfileIcon';
import {profile} from '../helpers/api';

const { Meta } = Card;
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export default class Profile extends Component{
    state = {
        loading: true,
        user_details: {
            first_name: '',
            last_name: '',
            email: '',
            color: ''
        }
    };
    
    onChange = checked => {
        this.setState({ loading: !checked });
    };

    async componentDidMount(){
        try{
            let user_token = JSON.parse(localStorage.getItem('user_data'))['token']
            let res = await profile(user_token);
            var randomValue = colorList[Math.floor(Math.random() * colorList.length)];
            this.setState({
                loading: false, user_details: res.data.data, color: randomValue
            });
        }
        catch (e){
            this.props.history.push('/')
        }
    }

    render(){
        const { loading, user_details, color } = this.state;
        return(
            <div>
                <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                <Meta
                    avatar={
                    <ProfileIcon user={user_details.first_name} color={color} />
                    }
                    title="Profile"
                />
                </Card>
            </div>
        );
    }
}