import React, { Component } from 'react';
import ship1 from './Assets/Ships/ship1.png';
import ship2 from './Assets/Ships/ship2.png';
import ship3 from './Assets/Ships/ship3.png';
import ship4 from './Assets/Ships/ship4.png';
import ship5 from './Assets/Ships/ship5.png';

class Ship extends Component {
  constructor(props) {
    super(props);
  
  }
  

  render() {
    let ship;
    if(this.props.ship === 'ship2' ){
      ship = ship2;
    }else{
      ship = ship2;
    }
    switch(this.props.ship){
      case 'ship1':
        ship = ship1
        break;
      case 'ship2':
        ship = ship2
        break;
      case 'ship3':
        ship = ship3
        break;
      case 'ship4':
        ship = ship4
        break;
      case 'ship5':
        ship = ship5
        break;
      default :
        ship = ''
        break;
    }



    const length = 75 * this.props.dimension;
    const shipImg = <img src={ship} alt="ship" onClick={() => { this.props.handleShipClick(this.props) }} ></img>
    const shipArr =[];
      for(let i = 0; i < this.props.dimension; i++){
        shipArr.push(shipImg)
      }
    return (
      <div        
        style={{ width: `${length}px`, height: '75px',  }}>
        {/* {this.props.name} */}
        {shipArr}
      </div>
    )
    
  }
}

export default Ship;