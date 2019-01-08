import React, { Component } from 'react';

class OpponentBoard extends Component{
  constructor(props) {
    super(props);
    this.state = {
        id: props.id,
        coordinates: props.value,
        status: 1,
        renderStatus: null,
        renderHover: null,
    }
  }

  hoverColor = () => {
    if(this.props.hover.includes(this.state.id)){
      return 'red';
    }else{
      return 'lightblue';
    }
  }

  render() {
    return (
      <div style={{
            backgroundColor: this.hoverColor(),
            outline: 'red solid 1px',
            width: '25px',
            height: '25px',
            fontSize: '3em',
          }}
        onClick={() => {
            this.props.handleTurnClick([this.props.playerId,this.state.id])
        }}
        onMouseEnter={() => {
            this.props.whenHover([this.state.id, true]);
        }}
        onMouseLeave={() => {
            this.props.whenHover([this.state.id, false]);
        }}
      >
      {this.state.renderStatus}
      </div>
    );  
  }
}

export default OpponentBoard;