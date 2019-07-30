import React, {Component} from 'react';

export default class Home extends Component{

    state = {
        playAgainstComputer: false,
        playAgainstFriend: false
    }

    playWithComputer = () => {
        this.setState({
            playAgainstComputer: true,
            playAgainstFriend: false
        })
    }

    playWithFriend = () => {
        this.setState({
            playAgainstFriend: true,
            playAgainstComputer: false
        })
    }

    render() {
        const {playAgainstComputer, playAgainstFriend} = this.state;
        
        return(
            <React.Fragment>
                <button onClick={() => this.playWithComputer}>Play Against Computer</button>
                <button onClick={() => this.playWithFriend}>Play with Friend</button>
            </React.Fragment>
        )
    }
}