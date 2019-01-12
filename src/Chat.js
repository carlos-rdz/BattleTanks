import React, { Component } from 'react';
import uuid from 'uuid/v4'
import './index.css'

class Chat extends Component {


  render() {
    let chatRoom = this.props.chat.map( (message) => {
      return (
        <ul style={{listStyleType: 'none'}}>
          <li key={uuid()}>>{message.name}: {message.text}</li>
        </ul>
      ) 
    })

    return (
      <div>
        {/* return both an input form and a chat history div */}
        <form onSubmit={this.props.handleSubmit}>
          <input type='text' 
            name={this.props.name} 
            onChange={this.props.handleChangeName}>
          </input>
          <input type='text' 
            placeholder='(Clean!) SmackTalk anyone???' 
            value={this.props.message.text} 
            onChange={this.props.handleChangeMessage} >
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