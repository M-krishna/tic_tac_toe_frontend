import React, {Component} from 'react';
import Game from './game_components/Game';

export default class Computer extends Component{
    state = {
        player: '',
        computer: '',
        selected: false
    }

    handleSelection = val => {
        this.setState({
            player: val,
            computer: val === 'O' ? 'X' : 'O',
            selected: true
        })
    }

    render(){
        return(
            <div>
                <p>Play against your friendly AI!</p>
                <p>Choose side:</p>
                <button onClick={() => this.handleSelection('O')}>O</button>
                <button onClick={() => this.handleSelection('X')}>X</button>
                {
                    this.state.selected ? 
                    <div>
                    <p>You selected {this.state.player}</p>
                    <Game player={this.state.player} computer={this.state.computer} /> 
                    </div>
                    : 
                    ''
                }
            </div>
        )
    }
}