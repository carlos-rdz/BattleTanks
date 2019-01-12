import React, { Component } from 'react';
import uuid from 'uuid/v4';
import PlayerBoard from './PlayerBoard';
import OpponentBoard from './OpponentBoard';

class PlayableBoard extends Component {


	render() {
		let counter = 1;
		let player = [];
		let opponent = [];
		const coord = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
		// create both player and opponent arrays simultaneously
		// pass the ship locations array down to the PlayerBoard and OpponentBoard
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				player.push(
					<PlayerBoard
						key={uuid()}
						value={coord[i] + (j + 1)}
						id={counter}
						playerPieces={this.props.playerPieces}
						playerStatus={this.props.playerStatus}
					/>
				);
				// click handler and id only required on OpponentBoard
				opponent.push(
					<OpponentBoard
						key={uuid()}
						value={coord[i] + (j + 1)}
						id={counter}
						handleTurnClick={this.props.handleTurnClick}
						playerId={this.props.playerId}
						opponentStatus={this.props.opponentStatus}
					/>
				);
				counter++;
			}
		}
		console.log('this.props.opponentPieces');
		console.log(this.props.opponentPieces);

		let renderOpponentBoard;
		if (this.props.opponentPieces.length > 0) {
			console.log('no div');
			renderOpponentBoard = (
				<div
					style={{
						width: '50px',
						height: '50px',
						display: 'grid',
						gridTemplateColumns: 'repeat(10, 1fr)',
						gridTemplateRows: 'repeat(10,1fr)'
					}}
				>
					{opponent}
				</div>
			);
		} else {
			console.log('modal div');
			renderOpponentBoard = (
				<div
					style={{
						backgroundColor: 'lightblue',
						width: '250px',
						height: '250px',
						display: 'grid'
					}}
				>
					Waiting on opponent
				</div>
			);
		}

		// let whoseTurn;
		let statusDisplay;

		if (this.props.turn) {
			statusDisplay = 'Your Turn';
		} else {
			statusDisplay = 'Their Turn';
		}

		if (this.props.didWin === true) {
			statusDisplay = 'You Won!';
		} else if (this.props.didWin === false) {
			statusDisplay = 'You Lost!';
		}

		return (
			<div>
				<h1>{statusDisplay}</h1>
				<div
					className='sidebyside'
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 250px)',
						gridGap: '25px'
					}}
				>
					<div
						style={{
							width: '50px',
							height: '50px',
							display: 'grid',
							gridTemplateColumns: 'repeat(10, 1fr)',
							gridTemplateRows: 'repeat(10,1fr)'
						}}
					>
						{player}
					</div>
					{renderOpponentBoard}
				</div>
			</div>
		);
	}
}

export default PlayableBoard;
