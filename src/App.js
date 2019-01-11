import React, { Component } from 'react';
import GameInit from './GameInit';
import Button from './Button';
import PlayableBoard from './PlayableBoard';
import {BrowserRouter as Router, Route} from 'react-router-dom';       
const ws = new WebSocket("ws://localhost:3001");


class App extends Component {
    constructor(props) {
        super(props);
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
            roomId: '',
        }
        
    }
    // Initialize status arrays on component mount 
    // rather than write out a default state of 2x 100 array zeros...
    componentDidMount(){
        ws.onopen = () => {
            ws.onmessage = (e) => {
                try{
                    let message = JSON.parse(e.data)
                    console.log(message)
                    switch(message.type) {
                        case 'roomInit':
                          console.log("set room state")
                          this.setState({
                              roomId: message.roomId,
                              turn: message.turn
                          })    
                          break;
                      
                        case 'shipLayoutFlat':
                          this._player2LocationArray(message.value)
                          console.log('set state performed')
                          break;
                      
                        case 'shipLayoutDetailed':
                          this._player2SunkStatus(message.value)
                          console.log('detailed object set')
                          break;
                      
                        case 'shotsFired':
                          this.state.turn ? this.setState({turn : false},console.log(this.state.turn)) : this.setState({turn : true},console.log(this.state.turn))
                          this._setPlayer1Status(message.value)
                          console.log('shotsFired data received')
                          break;
                          
                        case 'gameOver':
                          console.log('You Lost')
                          break;
                          
                        default:
                          console.log('conditionals broken')
                          break;
                        }
                    
                }catch (error){
                    console.log('catch ran')
                    console.log(error)
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
        }, () => {
            console.log(this.state.player1Pieces);
            console.log(this.state.player2Pieces)
        } )
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

    _setPlayer1Status = (updatedShots) => {
        console.log(updatedShots)
        console.log('updatedShots')
        this.setState({
            player1Status: updatedShots    
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
                player2SunkShips: sunkenShipNames
            }, this._sendShotResultsToOpp 
            )
        }
    }
    
    _sendShotResultsToOpp = () =>{
        ws.send(JSON.stringify({type: "shotsFired", value: this.state.player2Status, id: this.state.roomId}));
        this.state.turn ? this.setState({turn : false},console.log("its your turn")) : this.setState({turn : true},console.log("not your turn"))
        console.log("_sendShotResults ran")
        this._gameIsOver()
    }
    
    _gameIsOver = () =>{
        // This method is a simple check for game end.
        // It checks the length of both player arrays containing names of their sunken ships
        // If either player array is of length 5, all 5 ships have sunk and the game is over
      if(this.state.player1SunkShips.length === 5 || this.state.player2SunkShips.length === 5){
        console.log("You Won") 
        ws.send(JSON.stringify({type: 'gameOver', id:this.state.roomId}))  
      }
    }


    _handleTurnClick = (props) => {
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
            status = status1; 
            ships = ships1;
        }else if(props[0]=== 2 ){
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
                        
                    <div style={{height: 50+'px'}}/> 
                    <GameInit 
                        ws = {ws}
                        playerShipLoc = {this._player1LocationArray}
                        sunkStatus = {this._player1SunkStatus}
                        shipObj = {this.state.player1SinkStat}
                        roomId = {this.state.roomId}

                    /> 
                    </div>
                )
            }}/> 
            {/* gamestart route covers playable boards */}
            <Route path='/gamestart' render ={(props) => {
                return (
                    <div>
                    <div style={{width: 200+"px", backgroundColor: 'white' }}>{this.state.player2SunkShips}  </div>

                    <PlayableBoard 
                        playerPieces = {this.state.player1Pieces} 
                        opponentPieces = {this.state.player2Pieces}
                        handleTurnClick = {this._handleTurnClick}
                        opponentStatus = {this.state.player2Status}
                        playerStatus = {this.state.player1Status}
                        playerId = {1}
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