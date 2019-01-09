import React, { Component } from 'react';
import GameInit from './GameInit';
import Button from './Button';
import PlayableBoard from './PlayableBoard';
import {BrowserRouter as Router, Route} from 'react-router-dom';       
// const ws = new WebSocket("ws://localhost:3001");

class App extends Component {
    constructor(props) {
        super(props);
        this.ws = new WebSocket("ws://localhost:3001");
        this.state={
            player1Pieces: [],  // P1 placed ships
            player2Pieces: [],  // P2 placed ships
            player1Status: [],  // array of shots made against P1
            player2Status: [],  // array of shots made against P1
            turn : true,        // boolean tracking turn order with true = P1 false = P2
            player1SinkStat: [],    // array of P1 ship objects (contains name: location: sunk:) 
            player2SinkStat: [],    // array of P2 ship objects (contains name: location: sunk:) 
            player1SunkShips: [],   // contains names of any ships sunk by P2 opponent
            player2SunkShips: [],   // contains names of any ships sunk by P1 opponent
        }
        
    }
    // Initialize status arrays on component mount 
    // rather than write out a default state of 2x 100 array zeros...
    componentDidMount(){
        this.ws.onopen = () => {
            this.ws.send('hello world');  
            this.ws.onmessage = (e) => {
                try{
                    let message = JSON.parse(e.data)
                    console.log(message);
                    this._handleTurnClick(message)
                }catch (error){

                }
                
            }
        } 
             
        let newArr = new Array(100).fill(0);
        this.setState({
            player1Status: newArr,
            player2Status: newArr,
        })
    }
    
    // 
    _player1LocationArray = (arr) => {
        this.setState({
            player1Pieces: arr   
        })
    }

    _player2LocationArray = (arr) => {
        this.setState({
            player2Pieces: arr   
        })
    }

    _player1SunkStatus = (obj) => {
      console.log(obj)
      this.setState({
        player1SinkStat: obj 
      })
    }

    _player2SunkStatus = (obj) => {
      console.log(obj)
      this.setState({
        player2SinkStat: obj
      })
    }

    
    _setSunkStatus = (id) => {
        let shotsFiredArr;
        let shipObj;
        // choose which player arrays to update based on id of calling function
        if(id === 1){
            shotsFiredArr = this.state.player2Status; 
            shipObj = this.state.player2SinkStat;
        }else if(id === 2){
            shotsFiredArr = this.state.player1Status;
            shipObj = this.state.player1SinkStat
        }
        // Make a deep copy of state that we can mutate and then use to setState
        // Set all ships sunk status to true (this does not setState just updates the copy)
        let modifiedShipObj = shipObj.map((index) => {
            return {...index, sunk: true }
            })
        // For each of a player's 5 ships, 
        // take the location indicies of the ship.
        // Check shotsFiredArr at those indicies for anything not an "X"    
        // In effect if only X's were found the true state of sunk is left untouched and is correct.
        // If instead a value of 0 (default) or 'O' (miss) are found, no hit was registered at these ship coordinates yet 
        // so we set the sunk value back to false. 
        for(let i = 0; i < 5; i++){
            shipObj[i].location.forEach(index => {
                if(shotsFiredArr[index-1] !== "X"){
                    modifiedShipObj[i].sunk = false
                }
            });
        }
        // After this is done for all 5 ships we setState overwriting the ship objects with any changes to sunk state 
        // Then we call the checkSunkStatus function to make use of the new data
        if(id === 1){
            this.setState({
                player2SinkStat: modifiedShipObj   
            },()=> {this._checkSunkStatus(id)})
        }else{
            this.setState({
                player1SinkStat: modifiedShipObj
            },()=> {this._checkSunkStatus(id)})
        }
    }
   
    _checkSunkStatus = (id) => {
        // This method will loop through the sunk statuses of each ship 
        // and set the name in state of any sunken ship 
        // Finally, it calls a check function in gameIsOver for handling if the game has concluded or not
        const status1 = this.state.player2SinkStat
        const status2 = this.state.player1SinkStat 
        let status;
        let sunkenShips;

        if(id === 1){
            status = status1;
        }else if (id === 2){
            status = status2;
        }

        sunkenShips = status.filter(obj => {
            if(obj.sunk){
                return true
            }else{
                return false
            }
        })

        let sunkenShipNames = sunkenShips.map((obj) => {
            return obj.name
        })

        if(id === 1){
            this.setState({
                player1SunkShips: sunkenShipNames
            },this._gameIsOver)
        }else if(id === 2){
            this.setState({
                player2SunkShips: sunkenShipNames
            },this._gameIsOver)
        }
    }
    
    
    _gameIsOver = () =>{
        // This method is a simple check for game end.
        // It checks the length of both player arrays containing names of their sunken ships
        // If either player array is of length 5, all 5 ships have sunk and the game is over
      if(this.state.player1SunkShips.length === 5 || this.state.player2SunkShips.length === 5){
        console.log("Game Over")   
      }
    }


    _handleTurnClick = (props) => {
        this.ws.send(props)
        const status1 = this.state.player2Status
        const status2 = this.state.player1Status 
        const ships1 = this.state.player2Pieces
        const ships2 = this.state.player1Pieces
        let status;
        let ships;
        // If turn true player one's turn
        // else player two's turn
        // toggle turn value
        if(props[0]===1 && this.state.turn){
            this.state.turn ? this.setState({turn : false},console.log(this.state.turn)) : this.setState({turn : true},console.log(this.state.turn))
            status = status1; 
            ships = ships1;
        }else if(props[0]=== 2 && !this.state.turn){
            this.state.turn ? this.setState({turn : false},console.log(this.state.turn)) : this.setState({turn : true},console.log(this.state.turn))
            status = status2;
            ships = ships2
        }

        if (status){
            let modifyStatus = status.map((index,i) => {
                if(i+1 === props[1]){//index = shot index (our ids are from 1-100 not 0-99 hence the +1)
                if(ships.includes(props[1])){//shot index has a ship on it
                    return 'X'; //hit
                }else{
                    return 'O'; //miss
                }  
                }else{//every other index in array return as is
                    
                    return index;
                }
                })
                if(props[0] === 1){
                    this.setState({
                        player2Status: modifyStatus
                    },()=> {this._setSunkStatus(props[0])})
                }else{
                    this.setState({
                        player1Status: modifyStatus
                    },()=> {this._setSunkStatus(props[0])})
                }
            }else{
                console.log("Not your turn")
            }
        }
    

    render() {
      
        return (
            <Router>
            <div>
            {/* home route covers game initialization boards */}
            <Route path='/' exact render = {(props) => {
                return (
                    <div> 
                    <Button> </Button>
                    <GameInit 
                        playerShipLoc = {this._player1LocationArray}
                        sunkStatus = {this._player1SunkStatus}
                    /> 
                    <div style={{height: 50+'px'}}/> 
                    <GameInit 
                        playerShipLoc = {this._player2LocationArray}
                        sunkStatus = {this._player2SunkStatus}
                    />
                    </div>
                )
            }}/> 
            {/* gamestart route covers playable boards */}
            <Route path='/gamestart' render ={(props) => {
                return (
                    <div>
                    <div style={{width: 200+"px", backgroundColor: 'white' }}> {this.state.player1SunkShips} </div>
                    <PlayableBoard 
                        playerPieces = {this.state.player1Pieces} 
                        opponentPieces = {this.state.player2Pieces}
                        handleTurnClick = {this._handleTurnClick}
                        opponentStatus = {this.state.player2Status}
                        playerStatus = {this.state.player1Status}
                        playerId = {1}
                        />
                    <div style={{height: 225+'px'}}/> 
                    <div style={{width: 200+"px", backgroundColor: 'white' }}>{this.state.player2SunkShips}  </div>

                    <PlayableBoard 
                        playerPieces = {this.state.player2Pieces}
                        opponentPieces = {this.state.player1Pieces} 
                        handleTurnClick = {this._handleTurnClick}
                        opponentStatus = {this.state.player1Status}
                        playerStatus = {this.state.player2Status}
                        playerId = {2}
                    />
                    </div>
                )
            }}/>
            </div>
            </Router>
        );
    }
}

export default App;