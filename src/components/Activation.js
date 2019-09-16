import 'antd/dist/antd.css';
import React, {Component} from 'react';
import {activateUser} from '../helpers/api';
import {Redirect} from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

export default class Activation extends Component{
    state = {
        is_activated: false,
        no_params: false
    }

    async componentDidMount(){
        const params = new URLSearchParams(this.props.location.search)
        if(params.get('activate')){
            try{
                await activateUser(params.get('activate'));
                this.setState({is_activated: true})
            }
            catch(error){
                this.setState({is_activated: false})
            }
        }
        else{
            this.setState({no_params: true})
        }
    }
    render(){
        const {no_params, is_activated} = this.state;
        if(no_params){
            return <Redirect to="/login" />
        }
        if(is_activated){
            return(
                <React.Fragment><Title level={2}>Your Account has been activated.</Title></React.Fragment>
            )
        }
        return(
            <React.Fragment><Title level={2} className="text-align-center">Oops! Something went wrong.</Title></React.Fragment>
        )
    }
}