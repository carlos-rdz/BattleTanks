import React, { Component } from 'react';
import Hit from './Hit';

class OpponentBoard extends Component{
  constructor(props) {
    super(props);
    this.state = {
        id: props.id,
        coordinates: props.value,
        status: 1,
        onHover: "",
    }
  }

 

  render() {
    let onShot; 
    // if the shot array shows a hit at this tile location
    if(this.props.opponentStatus[this.state.id-1] === 'X'){
       onShot = <Hit/>
    }else if(this.props.opponentStatus[this.state.id-1] === 'O'){
        onShot = 'O'
    }
    let showCoordinates = this.state.onHover;

    return (
      <div style={{
            backgroundColor: 'lightblue',
            outline: 'red solid 1px',
            width: '25px',
            height: '25px',
            fontSize: '1em',
          }}
        onClick={() => {
            this.props.handleTurnClick([this.props.playerId,this.state.id])
        }}
        onMouseEnter={() => {
            console.log(this.state.id)
            this.setState({
              onHover: this.state.coordinates
            })
        }}
        onMouseLeave={() => {
          this.setState({
            onHover: ""
          })        
        }}
      >
      {onShot}
      {showCoordinates}
      </div>
    );  
  }
}

export default OpponentBoard;