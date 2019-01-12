import React, { Component } from 'react';
import InitBoard from './InitBoard';
import Ship from './Ship';
import Start from './Start';
import './GameInit.css';

class GameInit extends Component {
	constructor(props) {
		console.log('constructor');
		super(props);
		this.state = {
			selectedShipRotation: false, // boolean determines horiz/vert state false defaults to horizontal
			selectedShipLength: '', // selected ship tile multiplier
			selectedShipName: '', // name of selected ship
			displayHoverArray: [], // the hover effect is invoked on these tile locations
			shipsPlaced: [
				// each object is a ship
				{ name: 'submarine', location: [], sunk: false },
				{ name: 'destroyer', location: [], sunk: false },
				{ name: 'carrier', location: [], sunk: false },
				{ name: 'battleship', location: [], sunk: false },
				{ name: 'cruiser', location: [], sunk: false }
			]
		};
	}

	_handleShipClick = props => {
		this.setState({
			selectedShipLength: props.dimension,
			selectedShipName: props.name
		});
	};

	_handleHover = id => {
		// based on boolean pass tiles to appropriate helper
		// to calculate ship placement
		if (this.state.selectedShipRotation) {
			this.setState({
				displayHoverArray: this._calculateVertArray(id)
			});
		} else {
			this.setState({
				displayHoverArray: this._calculateHorizArray(id)
			});
		}
	};

	_calculateHorizArray = id => {
		//
		const tempArray = [];
		for (let i = 1; i <= this.state.selectedShipLength; i++) {
			if (i < this.state.selectedShipLength) {
				// handles all but the last case to keep from checking out of bounds array values
				if (id % 10 === 0 && ([id + 1] - 1) % 10 === 0) {
					return [];
				} else {
					tempArray.push(id);
					id++;
				}
			} else {
				// This is the last value in our display array and no
				// check past it should be performed
				tempArray.push(id);
			}
		}
		return tempArray;
	};

	_calculateVertArray = id => {
		let vertArray = [];
		// First vertical tile is always allowed if a ship is selected
		if (this.state.selectedShipLength) {
			vertArray.push(id);
		}
		// Set to next vert id which is the next row same column
		// or just 10 more than it's current position
		id = id + 10;
		// Only the bottom of the board needs an out of bounds check
		// If the location of a ship is ever set past the 100 tiles of the board, we
		for (let i = 0; i < this.state.selectedShipLength - 1; i++) {
			if (id > 100) {
				return (vertArray = []);
			} else {
				vertArray.push(id);
				id = id + 10;
			}
		}
		return vertArray;
	};

	_rotateShip = () => {
		// toggle the state of selectedShipRotation
		let toggle = this.state.selectedShipRotation ? false : true;
		this.setState({
			selectedShipRotation: toggle
		});
	};

	// will be to place ship on board
	_handleClick = () => {
		// place a ship
		// makes sure it cant place on occupied tiles
		const cantPlace = this.state.shipsPlaced.filter(obj => {
			if (obj.name === this.state.selectedShipName) {
				return false;
			} else {
				return true;
			}
		});
		const locArray = cantPlace.map(obj => {
			return obj.location;
		});

		let globalLocArray = locArray.flat();
		console.log(globalLocArray);

		// have to use for loop so that we can break
		let flag = false;
		for (let i = 0; i < this.state.displayHoverArray.length; i++) {
			if (globalLocArray.includes(this.state.displayHoverArray[i])) {
				flag = true;
			}
		}
		if (!flag) {
			//if can put ship here
			const shipsCopy = this.state.shipsPlaced.map(shipObject => {
				if (shipObject.name === this.state.selectedShipName) {
					return {
						...shipObject,
						location: this.state.displayHoverArray
					};
				} else {
					return shipObject;
				}
			});
			this.setState(
				{
					shipsPlaced: shipsCopy
				},
				() => {
					this.props.sunkStatus(shipsCopy);
				}
			);
		}
	};

	_renderArray = () => {
		const renderLocations = this.state.shipsPlaced.map(Obj => {
			return Obj.location;
		});
		return renderLocations.flat();
	};

	render() {
		//waiting for room to open
		let spinnerText;
		let waitingSpinner;
		if (this.props.roomId) {
			waitingSpinner = '';
			spinnerText = '';
			console.log('spinner set empty');
		} else {
			spinnerText = 'Waiting for opponent';
			waitingSpinner = 'sk-rotating-plane';
			console.log('spinner set to value');
		}

		return (
			<div className='GameInit'>
				<Start
					ws={this.props.ws}
					playerShipLoc={this.props.playerShipLoc}
					shipObject={this.state.shipsPlaced}
					flattenedArray={this._renderArray()}
					roomId={this.props.roomId}
					sunkStatus={this.props.sunkStatus}
					shipObj={this.props.shipObj}
				/>

				<div className='shipContainer'>
					<Ship handleShipClick={this._handleShipClick} dimension={2} name='destroyer' />
					<Ship handleShipClick={this._handleShipClick} dimension={3} name='submarine' />
					<Ship handleShipClick={this._handleShipClick} dimension={5} name='carrier' />
					<Ship handleShipClick={this._handleShipClick} dimension={4} name='battleship' />
					<Ship handleShipClick={this._handleShipClick} dimension={3} name='cruiser' />
				</div>
				<div className='InitBoardContainer'>
					<InitBoard
						handleClick={this._handleClick}
						handleHover={this._handleHover}
						hoverArray={this.state.displayHoverArray}
						selectedShipName={this.state.selectedShipName}
						selectedShipRotation={this.state.selectedShipRotation}
						rotateShip={this._rotateShip}
						renderedShips={this._renderArray()}
					/>
					<div className={waitingSpinner}> </div>
					<div> {spinnerText} </div>
				</div>
			</div>
		);
	}
}

export default GameInit;
