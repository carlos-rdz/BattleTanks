import React, { Component } from 'react';
import './GameInit.css';
import InitBoard from './InitBoard';
import Ship from './Ship';
import Start from './Start';
import Title from './Title';

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
				{ name: 'PT-2M Citadel', location: [], sunk: false },
				{ name: 'R5 Typhoon', location: [], sunk: false },
				{ name: 'J76A Zepher', location: [], sunk: false },
				{ name: 'DL08 Challenger', location: [], sunk: false },
				{ name: 'VB-4 Lynx', location: [], sunk: false }
			],
			currentShipImg: ''
		};
	}

	_handleShipClick = (props, ship) => {
		this.setState({
			selectedShipLength: props.dimension,
			selectedShipName: props.name,
			currentShipImg: ship
		});
	};

	_handleHoverRemove = () => {
		this.setState({
			displayHoverArray: []
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
		} else {
			spinnerText = 'Waiting for opponent';
			waitingSpinner = 'sk-rotating-plane';
		}

		return (
			<div className="GameInit">
				<Title />
				<div className="initDisplay">
					<div className="readyWrapper">
						<div> {spinnerText} </div>
						<div className={waitingSpinner}> </div>
					</div>
					<div className="startButton">
						<Start
							ws={this.props.ws}
							playerShipLoc={this.props.playerShipLoc}
							shipObject={this.state.shipsPlaced}
							flattenedArray={this._renderArray()}
							roomId={this.props.roomId}
							sunkStatus={this.props.sunkStatus}
							shipObj={this.props.shipObj}
						/>
					</div>
				</div>
				<div className="shipContainer">
					<Ship handleShipClick={this._handleShipClick} dimension={5} ship="ship1R" name="PT-2M Citadel" />
					<Ship handleShipClick={this._handleShipClick} dimension={4} ship="ship2R" name="R5 Typhoon" />
					<Ship handleShipClick={this._handleShipClick} dimension={3} ship="ship3R" name="J76A Zepher" />
					<Ship handleShipClick={this._handleShipClick} dimension={3} ship="ship4R" name="DL08 Challenger" />
					<Ship handleShipClick={this._handleShipClick} dimension={2} ship="ship5R" name="VB-4 Lynx" />
					<div className="instructions">
						<div>Click your tank - Hover over the board - Click to place</div>
						<div>(shift + click) toggles vert/horiz placement</div>
					</div>
				</div>
				<div className="InitBoardContainer">
					<InitBoard
						handleHoverRemove={this._handleHoverRemove}
						currentShipImg={this.state.currentShipImg}
						handleClick={this._handleClick}
						handleHover={this._handleHover}
						hoverArray={this.state.displayHoverArray}
						selectedShipName={this.state.selectedShipName}
						selectedShipRotation={this.state.selectedShipRotation}
						rotateShip={this._rotateShip}
						renderedShips={this._renderArray()}
						shipsPlacedObj={this.state.shipsPlaced}
					/>
				</div>
			</div>
		);
	}
}

export default GameInit;
