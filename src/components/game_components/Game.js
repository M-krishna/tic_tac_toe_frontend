import React, {Component} from 'react';
import Board from './Board';

export default class Game extends Component{
    render(){
        return(
            <div className="game">
                <div className="game-board">
                    <Board player={this.props.player} computer={this.props.computer}/>
                </div>
            </div>
        )
    }
}