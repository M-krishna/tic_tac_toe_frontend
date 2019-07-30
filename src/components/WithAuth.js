import React, {Component} from 'react';
import {checkAuth} from '../helpers/api';

export default function(ComponentToProtect){
    return class WithAuth extends Component{
        async componentDidMount(){
            try{
                const user_data = JSON.parse(localStorage.getItem('user_data'));
                if(!user_data){
                    return false; 
                }
                await checkAuth(user_data.token);
                return true;
            }
            catch (e){
                const error = new Error(e);
                console.log(error);
            }
        }
        render(){
            return(
                <ComponentToProtect {...this.props} />
            )
        }
    }
}