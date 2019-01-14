import React, { Component } from 'react';
import ship1R from './Assets/Ships/Red/ship1R.png';
import ship2R from './Assets/Ships/Red/ship2R.png';
import ship3R from './Assets/Ships/Red/ship3R.png';
import ship4R from './Assets/Ships/Red/ship4R.png';
import ship5R from './Assets/Ships/Red/ship5R.png';

class InitTile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			coordinates: props.value,
			renderShip: null
		};
	}

	_removeShip = () => {
		this.setState({
			renderShip: null
		});
	};

	render() {
    // const tempArray = this.props.renderedShips;
    const tempArray = this.props.shipsPlacedObj;
   
    

		if (this.props.hoverArray.includes(this.state.id)) {
			return (
				<div
					style={{
            backgroundImage: `url(${this.props.currentShipImg})`,
						width: '75px',
						height: '75px',
						fontSize: '3em'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onMouseLeave={this._removeShip}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				>
					{this.state.renderShip}
				</div>
			);
		} else if (tempArray[0].location && tempArray[0].location.includes(this.state.id)) {
			return (
				<div
					style={{
            backgroundImage: `url(${ship1R})`,
						width: '75px',
						height: '75px',
						fontSize: '3em'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onMouseLeave={this._removeShip}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				>
					{this.state.renderShip}
				</div>
      );
		} else if (tempArray[1].location && tempArray[1].location.includes(this.state.id)) {
			return (
				<div
					style={{
            backgroundImage: `url(${ship2R})`,
						width: '75px',
						height: '75px',
						fontSize: '3em'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onMouseLeave={this._removeShip}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				>
					{this.state.renderShip}
				</div>
      );
		} else if (tempArray[2].location && tempArray[2].location.includes(this.state.id)) {
			return (
				<div
					style={{
            backgroundImage: `url(${ship3R})`,
						width: '75px',
						height: '75px',
						fontSize: '3em'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onMouseLeave={this._removeShip}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				>
					{this.state.renderShip}
				</div>
      );
		} else if (tempArray[3].location && tempArray[3].location.includes(this.state.id)) {
			return (
				<div
					style={{
            backgroundImage: `url(${ship4R})`,
						width: '75px',
						height: '75px',
						fontSize: '3em'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onMouseLeave={this._removeShip}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				>
					{this.state.renderShip}
				</div>
      );
		} else if (tempArray[4].location && tempArray[4].location.includes(this.state.id)) {
			return (
				<div
					style={{
            backgroundImage: `url(${ship5R})`,
						width: '75px',
						height: '75px',
						fontSize: '3em'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onMouseLeave={this._removeShip}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				>
					{this.state.renderShip}
				</div>
      );
      
		// } else if (tempArray.includes(this.state.id)) {
		// 	return (
		// 		<div
		// 			style={{
    //         backgroundImage: `url(${this.props.currentShipImg})`,
		// 				width: '75px',
		// 				height: '75px',
		// 				fontSize: '3em'
		// 			}}
		// 			onMouseEnter={() => {
		// 				this.props.hover(this.state.id);
		// 			}}
		// 			onMouseLeave={this._removeShip}
		// 			onClick={e => {
		// 				if (e.shiftKey) {
		// 					this.props.rotateShip();
		// 				} else {
		// 					this.props.handleClick();
		// 				}
		// 			}}
		// 		>
		// 			{this.state.renderShip}
		// 		</div>
		// 	);
		} else {
			return (
				<div
					style={{
						backgroundColor: `white`,
						outline: 'black solid 1px',
						width: '75px',
						height: '75px',
						fontSize: '3em'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					 onMouseLeave={() => {this.props.handleHoverRemove()}}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				>
					{this.state.renderShip}
				</div>
			);
		}
	}
}

export default InitTile;
