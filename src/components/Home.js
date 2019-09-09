import React, {Component, Fragment} from 'react';
import Logout from './Logout';
import {logoutUser} from '../helpers/api';
import Game from './game_components/Game';
import '../App.css';
import {generateGameLink} from '../helpers/api';

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

    // Join Game functionality
    handleJoinGame = () => {
        this.setState({
            join_game: true
        })
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
            <Fragment>
                <button onClick={() => this.playWithComputer()}>Play Against Computer</button>
                <button onClick={() => this.playWithFriend()}>Play with Friend</button>
                <button onClick={() => this.handleJoinGame()}>Join Game</button>
                <Logout onClick={() => this.handleLogout()} />
                {this.state.getting_link ? <p>Getting Game Link...</p> : this.state.game_link}
                {this.state.join_game ? 
                    <div>
                        <input type="text" name="join_game_link" onChange={this.handleChange} />
                        <button onClick={() => this.joinGame()}>Join</button>
                    </div>
                    :
                    ''
                }
            </Fragment>
        )
    }
}