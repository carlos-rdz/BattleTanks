import React, { Component } from 'react';
import './index.css'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      name: '', 
      message: {text: '', name: ''},
    }
  }



  //update message state with each change
  _handleChangeMessage = (e) => {
    this.setState({
      message: {text: e.target.value, name: this.state.name}
    })
  }
  
  //when message is sent call helper function and clear message state
  _handleSubmit = (e) => {
    e.preventDefault();
    console.log("message submitted")
    this._addToChat()
    this.setState({
      message: {text: '', name: this.state.name}
    })
  }


  // copy chat arr add new message, set state to updated arr
  _addToChat = () => {
    let chatHistory = this.state.chat;
    chatHistory.push(this.state.message)
    chatHistory.reverse()
    this.setState({
      chat: chatHistory 
    })
  }

  _handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }



  render() {
    let chatRoom = this.state.chat.map( (message, i ) => {
      return (
        <ul style={{listStyleType: 'none'}}>
          <li>>{message.name}: {message.text}</li>
        </ul>
      ) 
    })

    return (
      <div>
        {/* return both an input form and a chat history div */}
        <form onSubmit={this._handleSubmit}>
          <input type='text' 
            name={this.state.name} 
            onChange={this._handleChangeName}>
          </input>
          <input type='text' 
            placeholder='(Clean!) SmackTalk anyone???' 
            value={this.state.message.text} 
            onChange={this._handleChangeMessage} >
          </input>
          <input type='submit' value='Send'></input>

        </form>
        <div 
        className='chatMessages'
        style ={{
          width: 200+'px', 
          height: 200+'px', 
          fontFamily: 'Contrail One, cursive',
          backgroundColor: 'dimgrey',
        }}>
          {chatRoom}
        </div>
      </div>
    );
  }
}

export default Chat;