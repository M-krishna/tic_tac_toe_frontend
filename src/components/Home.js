import React, {Component} from 'react';
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
            game_link: ''
        }
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
            })
            // this.setState({
            //     playAgainstFriend: true,
            //     playAgainstComputer: false
            // })
        }
        catch (e){
            const error = new Error(e)
            console.log(error)
        }
        
    }

    render() {
        const {playAgainstComputer, playAgainstFriend} = this.state;
        
        return(
            <React.Fragment>
                <button onClick={() => this.playWithComputer()}>Play Against Computer</button>
                <button onClick={() => this.playWithFriend()}>Play with Friend</button>
                <button>Join Game</button>
            </React.Fragment>
        )
    }
}