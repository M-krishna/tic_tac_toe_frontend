import React, {Component} from 'react';

export default function(ComponentToProtect){
    return class WithAuth extends Component{
        async componentDidMount(){
            try{
                const user_data = JSON.parse(localStorage.getItem('user_data'));
                if(!user_data){
                    this.props.history.push('/') 
                }
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