import React, { Component } from 'react';
import HitPlayerBoard from './HitPlayerBoard';
import Miss from './Miss';
import ship1R from './Assets/Ships/Red/ship1R.png';
import ship2R from './Assets/Ships/Red/ship2R.png';
import ship3R from './Assets/Ships/Red/ship3R.png';
import ship4R from './Assets/Ships/Red/ship4R.png';
import ship5R from './Assets/Ships/Red/ship5R.png';
import ship1Rbroken from './Assets/Ships/Red/ship1Rbroken.png';
import ship2Rbroken from './Assets/Ships/Red/ship2Rbroken.png';
import ship3Rbroken from './Assets/Ships/Red/ship3Rbroken.png';
import ship4Rbroken from './Assets/Ships/Red/ship4Rbroken.png';
import ship5Rbroken from './Assets/Ships/Red/ship5Rbroken.png';
import StaticExplosion from './Assets/staticExplosion.png';
import StaticMiss from './Assets/staticMiss.png';

class PlayerBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			coordinates: props.value,
			status: 1
		};
	}
	render() {
    let onShot;
    let hitFlag;
		// if the shot array shows a hit at this tile location
		if (this.props.playerStatus[this.state.id - 1] === 'tempX') {
      onShot = <HitPlayerBoard />;
      hitFlag = true;
		} else if (this.props.playerStatus[this.state.id - 1] === 'tempO') {
      hitFlag = false;
      onShot = <Miss />;
		} else if (this.props.playerStatus[this.state.id - 1] === 'X') {
      hitFlag = true;
			// onShot = <img src={StaticExplosion} alt="" style={{ maxHeight: 100 + '%', maxWidth: 100 + '%' }} />;
    } else if (this.props.playerStatus[this.state.id - 1] === 'O') {
      hitFlag = false;
			onShot = <img src={StaticMiss} alt="" style={{ maxHeight: 100 + '%', maxWidth: 100 + '%' }} />;
		}

    let ship;
    // if its a ship at this location and a hit swap for broken asset
		if (this.props.player1SinkStat[0].location.includes(this.state.id) && hitFlag === true){
        ship = ship1Rbroken;
        
        return (
          <div
            style={{
              backgroundImage: `url(${ship})`,
              width: '75px',
              height: '75px',
              fontSize: '3em',
              color: 'yellow',
              fontFamily: 'Contrail One, cursive'
            }}
          >
            {onShot}
          </div>
        );

			} else if(this.props.player1SinkStat[0].location.includes(this.state.id)){
				ship = ship1R;

			return (
				<div
					style={{
						backgroundImage: `url(${ship})`,
						width: '75px',
						height: '75px',
						fontSize: '3em',
						fontFamily: 'Contrail One, cursive'
					}}
				>
					{onShot}
				</div>
			);
      }else if (this.props.player1SinkStat[1].location.includes(this.state.id) && this.props.playerStatus[this.state.id - 1] === 'tempX'){
        ship = ship2Rbroken;
        
        return (
          <div
            style={{
              backgroundImage: `url(${ship})`,
              width: '75px',
              height: '75px',
              fontSize: '3em',
              color: 'yellow',
              fontFamily: 'Contrail One, cursive'
            }}
          >
            {onShot}
          </div>
        );

			} else if(this.props.player1SinkStat[1].location.includes(this.state.id)){
				ship = ship2R;

			return (
				<div
					style={{
						backgroundImage: `url(${ship})`,
						width: '75px',
						height: '75px',
						fontSize: '3em',
						fontFamily: 'Contrail One, cursive'
					}}
				>
					{onShot}
				</div>
      );
      }else if (this.props.player1SinkStat[2].location.includes(this.state.id) && this.props.playerStatus[this.state.id - 1] === 'tempX'){
        ship = ship3Rbroken;
        
        return (
          <div
            style={{
              backgroundImage: `url(${ship})`,
              width: '75px',
              height: '75px',
              fontSize: '3em',
              color: 'yellow',
              fontFamily: 'Contrail One, cursive'
            }}
          >
            {onShot}
          </div>
        );

			} else if(this.props.player1SinkStat[2].location.includes(this.state.id)){
				ship = ship3R;

			return (
				<div
					style={{
						backgroundImage: `url(${ship})`,
						width: '75px',
						height: '75px',
						fontSize: '3em',
						fontFamily: 'Contrail One, cursive'
					}}
				>
					{onShot}
				</div>
      );
        }else if (this.props.player1SinkStat[3].location.includes(this.state.id) && this.props.playerStatus[this.state.id - 1] === 'tempX'){
        ship = ship4Rbroken;
        
        return (
          <div
            style={{
              backgroundImage: `url(${ship})`,
              width: '75px',
              height: '75px',
              fontSize: '3em',
              color: 'yellow',
              fontFamily: 'Contrail One, cursive'
            }}
          >
            {onShot}
          </div>
        );

			} else if(this.props.player1SinkStat[3].location.includes(this.state.id)){
				ship = ship4R;

			return (
				<div
					style={{
						backgroundImage: `url(${ship})`,
						width: '75px',
						height: '75px',
						fontSize: '3em',
						fontFamily: 'Contrail One, cursive'
					}}
				>
					{onShot}
				</div>
      );
      }else if (this.props.player1SinkStat[4].location.includes(this.state.id) && this.props.playerStatus[this.state.id - 1] === 'tempX'){
        ship = ship5Rbroken;
        
        return (
          <div
            style={{
              backgroundImage: `url(${ship})`,
              width: '75px',
              height: '75px',
              fontSize: '3em',
              color: 'yellow',
              fontFamily: 'Contrail One, cursive'
            }}
          >
            {onShot}
          </div>
        );

			} else if(this.props.player1SinkStat[4].location.includes(this.state.id)){
				ship = ship5R;

			return (
				<div
					style={{
						backgroundImage: `url(${ship})`,
						width: '75px',
						height: '75px',
						fontSize: '3em',
						fontFamily: 'Contrail One, cursive'
					}}
				>
					{onShot}
				</div>
			);
		} else {
			//all player tiles without ships
			return (
				<div
					style={{
						backgroundColor: `white`,
						outline: 'black solid 1px',
						width: '75px',
						height: '75px',
						fontSize: '1em',
						fontFamily: 'Contrail One, cursive'
					}}
				>
					{onShot}
				</div>
			);
		}
	}
}

export default PlayerBoard;
