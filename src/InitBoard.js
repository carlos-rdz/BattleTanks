import React, {Component} from 'react';
import uuid from 'uuid/v4';
import InitTile from './InitTile';

class InitBoard extends Component {

  render(){
    let counter = 1;
    let squares = [];
    const coord = ['A', 'B','C','D','E','F','G','H','I', 'J'];
    for (let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++){
        squares.push(<InitTile 
          key={uuid()} 
          value={coord[i]+(j+1)}
          id = {counter++}
          hover = {this.props.handleHover}
          hoverArray = {this.props.hoverArray}
          handleClick = {this.props.handleClick}
          selectedShipName = {this.props.selectedShipName}
          selectedShipRotation = {this.props.selectedShipRotation}
          rotateShip = {this.props.rotateShip}
          renderedShips = {this.props.renderedShips}
          playerShipLoc = {this.props.playerShipLoc}
          />);
      }
  }

    return (
      <div style={{
        width: '100px',
        height: '100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gridTemplateRows: 'repeat(10,1fr)'
        
      }}>
        {squares}
      </div>
    );
    }
  }
  
  export default InitBoard;