import React, {Component} from 'react';

class Ship extends Component{
    constructor(props) {
        super(props);
        this.state={
            // multiplier
            dimension: props.dimension,
            name: props.name,
        }
    }
   

    render(){
        const length = 50*this.state.dimension;
        // console.log(length)
        return (
            <div 
            // dimension={this.props.dimension} 
            onClick = {() => {this.props.handleShipClick(this.state)}}
            style={{width:`${length}px`, height:"50px", border:"solid 2px black", backgroundColor:"green"}}>
            {this.props.name}
            </div>
             );
    }
}

export default Ship;