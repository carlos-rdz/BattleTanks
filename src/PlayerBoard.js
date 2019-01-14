import React, { Component } from 'react';
import Hit from './Hit';
import Miss from './Miss';
import ship1R from './Assets/Ships/Red/ship1R.png';
import ship2R from './Assets/Ships/Red/ship2R.png';
import ship3R from './Assets/Ships/Red/ship3R.png';
import ship4R from './Assets/Ships/Red/ship4R.png';
import ship5R from './Assets/Ships/Red/ship5R.png';

class PlayerBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      coordinates: props.value,
      status: 1,
    }
  }
  render() {
    let onShot;
    // if the shot array shows a hit at this tile location
    if (this.props.playerStatus[this.state.id - 1] === 'tempX') {
      onShot = <Hit />
    } else if (this.props.playerStatus[this.state.id - 1] === 'tempO') {
      onShot = <Miss />
    }else if (this.props.playerStatus[this.state.id - 1] === 'X') {
      onShot = 'X';
    } else if (this.props.playerStatus[this.state.id - 1] === 'O') {
      onShot = 'O';
    }
    // render tiles, yellow for ship, blue no ship
    if (this.props.player1SinkStat[0].location.includes(this.state.id)) {
      return (
        <div style={{
          backgroundImage: `url(${ship1R})`,
          width: '75px',
          height: '75px',
          fontSize: '3em',
          color: 'yellow',
          fontFamily: 'Contrail One, cursive'
        }}
        >
          {onShot}
        </div>
      );
    }else if (this.props.player1SinkStat[1].location.includes(this.state.id)) {
      return (
        <div style={{
          backgroundImage: `url(${ship2R})`,
          width: '75px',
          height: '75px',
          fontSize: '3em',
          color: 'yellow',
          fontFamily: 'Contrail One, cursive'
        }}
        >
          {onShot}
        </div>
      );
    }else if (this.props.player1SinkStat[2].location.includes(this.state.id)) {
      return (
        <div style={{
          backgroundImage: `url(${ship3R})`,
          width: '75px',
          height: '75px',
          fontSize: '3em',
          color: 'yellow',
          fontFamily: 'Contrail One, cursive'
        }}
        >
          {onShot}
        </div>
      );
    }else if (this.props.player1SinkStat[3].location.includes(this.state.id)) {
      return (
        <div style={{
          backgroundImage: `url(${ship4R})`,
          width: '75px',
          height: '75px',
          fontSize: '3em',
          color: 'yellow',
          fontFamily: 'Contrail One, cursive'
        }}
        >
          {onShot}
        </div>
      );
    }else if (this.props.player1SinkStat[4].location.includes(this.state.id)) {
      return (
        <div style={{
          backgroundImage: `url(${ship5R})`,
          width: '75px',
          height: '75px',
          fontSize: '3em',
          color: 'yellow',
          fontFamily: 'Contrail One, cursive'
        }}
        >
          {onShot}
        </div>
      );
    } else { //all player tiles without ships
      return (
        <div style={{
          backgroundColor: `white`,
          outline: 'black solid 1px',
          width: '75px',
          height: '75px',
          fontSize: '1em',
          fontFamily: 'Contrail One, cursive'
        }}
        >
          {onShot}
        </div>
      );
    }
  }
}

export default PlayerBoard;