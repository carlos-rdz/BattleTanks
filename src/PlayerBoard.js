import React, { Component } from 'react';
import Hit from './Hit';

class PlayerBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            coordinates: props.value,
            status: 1,
        }
    }
    render() {
        let onShot; 
        // if the shot array shows a hit at this tile location
        if(this.props.playerStatus[this.state.id-1] === 'X'){
           onShot = <Hit/>
        }else if(this.props.playerStatus[this.state.id-1] === 'O'){
            onShot = 'O'
        }
// render tiles, yellow for ship, blue no ship
        if (this.props.playerPieces.includes(this.state.id)) {
            return (
                <div style={{
                        backgroundColor: `lightgreen`,
                        outline: 'red solid 1px',
                        width: '25px',
                        height: '25px',
                        fontSize: '1em',
                    }}
                    >
                    {onShot}
                    </div>
            );
        }else { //all player tiles without pieces
            return (
                <div style={{
                    backgroundColor: `lightblue`,
                    outline: 'red solid 1px',
                    width: '25px',
                    height: '25px',
                    fontSize: '1em',
                }}
                >
                {onShot}
                </div>
            );
        }  
    }
 }

export default PlayerBoard;