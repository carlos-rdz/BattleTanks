import React, { Component } from 'react';
import uuid from 'uuid/v4';
import PlayerBoard from './PlayerBoard';
import OpponentBoard from './OpponentBoard';

class PlayableBoard extends Component {
 constructor(props) {
   super(props);
   this.state={
      hover: [],
   }
 }
 
//  if passed true hover in effect add id to array
//  else if false set an empty array
 _handleHover = (props) => {
   if(props[1] === true){
      this.setState=({
        hover: props[0]
      })
    }else if(!props[1]){
      this.setState=({
        hover: []
      })
    }
   }
    
  
    render() {
       console.log(this.props.opponentStatus)
        let counter = 1;
        let player = [];
        let opponent = [];
        const coord = ['A', 'B','C','D','E','F','G','H','I', 'J'];
        // create both player and opponent arrays simultaneously
        // pass the ship locations array down to the PlayerBoard and OpponentBoard
        for (let i = 0; i < 10; i++) {
          for(let j = 0; j < 10; j++){
              player.push(
              <PlayerBoard 
                key={uuid()} 
                value={coord[i]+(j+1)}
                id = {counter}
                playerPieces = {this.props.playerPieces} 
                playerStatus = {this.props.playerStatus}
              />);
              // click handler and id only required on OpponentBoard
              opponent.push(
              <OpponentBoard 
                key={uuid()} 
                value={coord[i]+(j+1)}
                id = {counter}
                handleTurnClick = {this.props.handleTurnClick}
                playerId = {this.props.playerId}
                whenHover = {this._handleHover}
                hover = {this.state.hover}
                opponentStatus = {this.props.opponentStatus}
              />);
              counter++;
          }
        }
    return (
      <div className='sidebyside' style={{
        display:'grid',
        gridTemplateColumns:'repeat(2, 250px)',
        gridGap: '25px', 
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(10,1fr)'
        }}>
          {player}
        </div>

        <div style={{
          width: '50px',
          height: '50px',
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(10,1fr)'
        }}>
          {opponent}
        </div>
    </div>
      );
  }
}

export default PlayableBoard;