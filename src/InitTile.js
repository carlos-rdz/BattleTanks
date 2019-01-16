import React, { Component } from 'react';
import ship1R from './Assets/Red/ship1R.png';
import ship2R from './Assets/Red/ship2R.png';
import ship3R from './Assets/Red/ship3R.png';
import ship4R from './Assets/Red/ship4R.png';
import ship5R from './Assets/Red/ship5R.png';
//
class InitTile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			coordinates: props.value
		};
	}

	render() {
		const tempArray = this.props.shipsPlacedObj;

		if (this.props.hoverArray.includes(this.state.id)) {
			return (
				<div
					style={{
						backgroundImage: `url(${this.props.currentShipImg})`,
						width: '75px',
						height: '75px',
						outline: '1px black solid'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onMouseLeave={() => {
						this.props.handleHoverRemove();
					}}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				/>
			);
		} else if (tempArray[0].location && tempArray[0].location.includes(this.state.id)) {
			return (
				<div
					style={{
						backgroundImage: `url(${ship1R})`,
						width: '75px',
            height: '75px',
            outline: '1px black solid',
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				/>
			);
		} else if (tempArray[1].location && tempArray[1].location.includes(this.state.id)) {
			return (
				<div
					style={{
						backgroundImage: `url(${ship2R})`,
						width: '75px',
            height: '75px',
            outline: '1px black solid'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				/>
			);
		} else if (tempArray[2].location && tempArray[2].location.includes(this.state.id)) {
			return (
				<div
					style={{
						backgroundImage: `url(${ship3R})`,
						width: '75px',
            height: '75px',
            outline: '1px black solid'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				/>
			);
		} else if (tempArray[3].location && tempArray[3].location.includes(this.state.id)) {
			return (
				<div
					style={{
						backgroundImage: `url(${ship4R})`,
						width: '75px',
            height: '75px',
            outline: '1px black solid'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				/>
			);
		} else if (tempArray[4].location && tempArray[4].location.includes(this.state.id)) {
			return (
				<div
					style={{
						backgroundImage: `url(${ship5R})`,
						width: '75px',
            height: '75px',
            outline: '1px black solid'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				/>
			);
		} else {
			return (
				<div
					style={{
						backgroundColor: `white`,
						outline: 'black solid 1px',
						width: '75px',
						height: '75px'
					}}
					onMouseEnter={() => {
						this.props.hover(this.state.id);
					}}
					onMouseLeave={() => {
						this.props.handleHoverRemove();
					}}
					onClick={e => {
						if (e.shiftKey) {
							this.props.rotateShip();
						} else {
							this.props.handleClick();
						}
					}}
				/>
			);
		}
	}
}

export default InitTile;
