import 'antd/dist/antd.css';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import {logoutUser} from '../helpers/api';

const { SubMenu } = Menu;

class Navbar extends Component{

    state = {
        collapsed: true,
    };

    handleLogout = async () => {
        try{
            const token = JSON.parse(localStorage.getItem('user_data'))['token'];
            let response = await logoutUser(token);
            if(response.status === 200){
                localStorage.removeItem('user_data');
                this.props.history.push("/");
            }
        }
        catch (e){
            const error = new Error(e);
            console.log(error)
        }
    }

    render(){
        return(
            <div>
                <Menu
                mode="inline"
                theme="dark"
                style={{ height: '100%', bottom: '0' }}
                >
                    <Menu.Item key="1">
                        <Icon type="desktop" />
                        <span>Vs Computer</span>
                        <Link to="/play/ai"></Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="meh" />
                        <span>Vs Friend</span>
                        <Link to="/play/friend"></Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="api" />
                        <span>Join Game</span>
                        <Link to="/join/game"></Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="more" />
                        </span>
                        }
                    >
                            <Menu.Item key="5"><Link to="/profile">View Profile</Link></Menu.Item>
                            <Menu.Item key="6" onClick={() => this.handleLogout()}>Logout</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default withRouter(Navbar);
