import React, {Component} from 'react';

class InitTile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            coordinates: props.value,
            renderShip: null,
        }
    }
       
    _removeShip = () => {
        this.setState({
            renderShip: null,
        })
    } 

    render() {

        const tempArray = this.props.renderedShips;
       
        if (this.props.hoverArray.includes(this.state.id) ){
            return (
                <div style={{ 
                    backgroundColor: `red`,
                    outline: 'red solid 1px',
                    width: '50px',
                    height: '50px',
                    fontSize: '3em',
                }} 
                    onMouseEnter={
                    () => {
                        this.props.hover(this.state.id);
                        }
                    }
                    onMouseLeave={this._removeShip}
                    onClick={(e)=> {
                        if(e.shiftKey){
                            this.props.rotateShip();
                        }else{
                            this.props.handleClick();
                        }
                    }}
                >
                {this.state.renderShip}
                </div>
            );
        }else if (tempArray.includes(this.state.id)){
            return (
                <div style={{ 
                    backgroundColor: `yellow`,
                    outline: 'red solid 1px',
                    width: '50px',
                    height: '50px',
                    fontSize: '3em',
                }}  onMouseEnter={
                    () => {
                        this.props.hover(this.state.id);
                        }
                    }
                    onMouseLeave={this._removeShip}
                    onClick={(e)=> {
                        if(e.shiftKey){
                            this.props.rotateShip();
                        }else{
                            this.props.handleClick();
                        }
                    }}
                >
                {this.state.renderShip}    
                </div>
            );
        }else{
            return (
                <div style={{ 
                    backgroundColor: `lightblue`,
                    outline: 'black solid 1px',
                    width: '50px',
                    height: '50px',
                    fontSize: '3em',
                }}   onMouseEnter={
                    () => {
                        this.props.hover(this.state.id);
                        }
                    }
                    onMouseLeave={this._removeShip}
                    onClick={(e)=> {
                        if(e.shiftKey){
                            this.props.rotateShip();
                        }else{
                            this.props.handleClick();
                        }
                    }}
                    >

                {this.state.renderShip}
                </div>
            );
        }
    };

}

export default InitTile;
