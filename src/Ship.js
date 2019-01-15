import React, { Component } from 'react';
import ship1R from './Assets/Red/ship1R.png';
import ship2R from './Assets/Red/ship2R.png';
import ship3R from './Assets/Red/ship3R.png';
import ship4R from './Assets/Red/ship4R.png';
import ship5R from './Assets/Red/ship5R.png';

class Ship extends Component {
	render() {
		let ship;
		switch (this.props.ship) {
			case 'ship1R':
				ship = ship1R;
				break;
			case 'ship2R':
				ship = ship2R;
				break;
			case 'ship3R':
				ship = ship3R;
				break;
			case 'ship4R':
				ship = ship4R;
				break;
			case 'ship5R':
				ship = ship5R;
				break;
			default:
				ship = '';
				break;
		}

		const length = 75 * this.props.dimension;
		const shipImg = (
			<img
				src={ship}
				alt="ship"
				onClick={() => {
					this.props.handleShipClick(this.props, ship);
				}}
			/>
		);
		const shipArr = [];
		for (let i = 0; i < this.props.dimension; i++) {
			shipArr.push(shipImg);
		}
		return (
			<div
				// dimension={this.props.dimension}

				style={{ width: `${length}px`, height: '75px' }}
			>
				{/* {this.props.name} */}
				{shipArr}
			</div>
		);
	}
}

export default Ship;
