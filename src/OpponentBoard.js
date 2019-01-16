import React, { Component } from 'react';
import Hit from './Hit';
import Miss from './Miss';
import HitFX from './HitFX';
import MissFX from './MissFX';
import StaticExplosion from './Assets/staticExplosion.png';
import StaticMiss from './Assets/staticMiss.png';
import Reticle from './Assets/crosshair026.png';

class OpponentBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			coordinates: props.value,
      coordinatesOnHover: '',
      reticleHover: '',
		};
	}

	// only show coordinates on tiles with default status
	_onHover = () => {
		if (this.props.opponentStatus[this.state.id - 1] === 0) {
			this.setState({
        coordinatesOnHover: <div >{this.state.coordinates}</div>,
        reticleHover: <img style={{width:'75px'}}src={Reticle} alt=''/>
			});
		}
	};

	render() {
		let showCoordinates = this.state.coordinatesOnHover;
		let onShot;
		let firingSolution;
		// if the shot array shows a hit at this tile location and isn't a previous shot value
		// render both the visual and audio effects else don't do anything
		// if(this.state.beenShot[this.state.id] === 'no'){
		console.log('this.props.opponentStatus');
		console.log(this.props.opponentStatus);
		if (this.props.opponentStatus[this.state.id - 1] === 'tempX') {
			onShot = <Hit />;
			firingSolution = <HitFX />;
		} else if (this.props.opponentStatus[this.state.id - 1] === 'tempO') {
			onShot = <Miss />;
			firingSolution = <MissFX />;
		} else if (this.props.opponentStatus[this.state.id - 1] === 'X') {
			onShot = <img src={StaticExplosion} alt="" style={{ maxHeight: 100 + '%', maxWidth: 100 + '%' }} />;
		} else if (this.props.opponentStatus[this.state.id - 1] === 'O') {
			onShot = <img src={StaticMiss} alt="" style={{ maxHeight: 100 + '%', maxWidth: 100 + '%' }} />;
		}

		let updatePlayerRender = this.props.playerStatus.map(index => {
			if (index === 'tempX') {
				return 'X';
			} else if (index === 'tempO') {
				return 'O';
			} else {
				return index;
			}
		});

		return (
			<div
				style={{
					backgroundColor: 'white',
					outline: 'black solid 1px',
					width: '75px',
					height: '75px',
					fontSize: '1em',
					fontFamily: 'Contrail One, cursive'
				}}
				onClick={() => {
					this.props.setPlayer1Status(updatePlayerRender);
					this.props.handleTurnClick([this.props.playerId, this.state.id]);
				}}
				onMouseEnter={() => {
					this._onHover();
				}}
				onMouseLeave={() => {
					this.setState({
            coordinatesOnHover: '',
            reticleHover: ''
					});
				}}
			>
				{onShot}
        {firingSolution}
        <div className='hoverWrapper' >
          <div className='coordinates'>
            {this.state.coordinatesOnHover}
          </div>
          <div className='reticle'>
            {this.state.reticleHover}
          </div>
        </div>
       
			</div>
		);
	}
}

export default OpponentBoard;
