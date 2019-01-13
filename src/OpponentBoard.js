import React, { Component } from 'react';
import Hit from './Hit';
import ExplosionFX from './ExplosionFX';

class OpponentBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			coordinates: props.value,
			onHover: ''
		};
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
    let explosion;
		// if the shot array shows a hit at this tile location
		if (this.props.opponentStatus[this.state.id - 1] === 'X') {
      onShot = <Hit />;
      explosion = <ExplosionFX />; //only explosion on hit
		} else if (this.props.opponentStatus[this.state.id - 1] === 'O') {
      onShot = 'O';
		}

		return (
			<div
				style={{
					backgroundColor: 'lightblue',
					outline: 'red solid 1px',
					width: '25px',
					height: '25px',
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
        {explosion}
				{showCoordinates}
			</div>
		);
	}
}

export default OpponentBoard;
