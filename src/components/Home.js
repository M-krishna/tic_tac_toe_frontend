import 'antd/dist/antd.css';
import React, {Component} from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';
// import Game from './game_components/Game';
import '../App.css';
import {generateGameLink} from '../helpers/api';
import {logoutUser} from '../helpers/api';

const { Sider } = Layout;

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            playAgainstComputer: false,
            playAgainstFriend: false,
            getting_link: false,
            game_link: '',
            join_game_link: '',
            join_game: false
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    playWithComputer = () => {
        this.setState({
            playAgainstComputer: true,
            playAgainstFriend: false
        })
    }

    playWithFriend = async () => {
        try{
            this.setState({getting_link: true})
            let token = JSON.parse(localStorage.getItem('user_data'))['token'];
            let response = await generateGameLink(token);
            let game_link = response.data.data;
            this.setState({
                getting_link: false,
                game_link
            });
            this.openChannelConnection();
        }
        catch (e){
            const error = new Error(e)
            console.log(error)
        }
        
    }

    // Join Game functionality
    handleJoinGame = () => {
        this.setState({
            join_game: true
        })
    }

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

    // Function for socket connection
    openChannelConnection = () => {
        let socket = new WebSocket(`ws://localhost:8000/ws/create/game/room/${this.state.game_link}`);

        socket.onopen = e => {
            console.log('connection established');
        }

        socket.onmessage = e => {
            console.log('message ', e.data)
        }

        socket.onclose = e => {
            console.log('onclose')
        }

        socket.onerror = e => {
            console.log('onerror');
        }
    }

    render() {
        return(
            <div>
                <p>Welcome</p>
            </div>
        )
    }
}