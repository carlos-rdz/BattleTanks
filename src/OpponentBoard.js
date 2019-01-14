import React, { Component } from 'react';
import Hit from './Hit';
import Miss from './Miss';
import HitFX from './HitFX';
import MissFX from './MissFX';

class OpponentBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			coordinates: props.value,
			onHover: '',
      beenShot: [],
      onShot: '',
		};
	}
  //initialize beenShot array 
  componentDidMount = () => {
    let newArr = new Array(100).fill('no');
		// this.setState({
    //   beenShot: newArr
    // })
    let shots = newArr;
  }

	// only show coordinates on tiles with default status
	_onHover = () => {
		if (this.props.opponentStatus[this.state.id - 1] === 0) {
			this.setState({
				onHover: this.state.coordinates
			});
		}
  };
  

	render() {
		let showCoordinates = this.state.onHover;
		let onShot;
		let firingSolution;
		// if the shot array shows a hit at this tile location and isn't a previous shot value
    // render both the visual and audio effects else don't do anything
    // if(this.state.beenShot[this.state.id] === 'no'){
	  	if (this.props.opponentStatus[this.state.id - 1] === 'X') {
        onShot = <Hit />;
        firingSolution = <HitFX />;
      } else if (this.props.opponentStatus[this.state.id - 1] === 'O') {
        onShot = <Miss />;
        firingSolution = <MissFX />;
      }
    
      // make a copy of state
      let prevShot = [...this.state.beenShot]
      // add new shot location to array
      prevShot[this.state.id] = 'yes';
      // update state with revised shot record
      // this.setState({
      //   beenShot: prevShot
      // });
    // }

		return (
			<div
				style={{
					backgroundColor: 'lightblue',
					outline: 'red solid 1px',
					width: '75px',
					height: '75px',
					fontSize: '1em',
					fontFamily: 'Contrail One, cursive'
				}}
				onClick={() => {
          this.props.handleTurnClick([this.props.playerId, this.state.id]);
          
				}}
				onMouseEnter={() => {
					this._onHover();
				}}
				onMouseLeave={() => {
					this.setState({
						onHover: ''
					});
				}}
			>
				{onShot}
				{firingSolution}
				{showCoordinates}
			</div>
		);
	}
}

export default OpponentBoard;
