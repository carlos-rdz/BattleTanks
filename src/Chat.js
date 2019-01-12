import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      name: '', 
      message: '',
    }
  }



  //update message state with each change
  _handleChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }
  
  //when message is sent call helper function and clear message state
  _handleSubmit = (e) => {
    e.preventDefault();
    console.log("message submitted")
    this._addToChat()
    this.setState({
      message: '' 
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

  // _handleChangeName = (e) => {
  //   this.setState({
  //     name: e.target.value
  //   });
  // }



  render() {
    // let chatRoom = this.state.chat.map( (message) => {
    //   return () 
    // })

    return (
      <div>
        {/* return both an input form and a chat history div */}
        <form onSubmit={this._handleSubmit}>
          {/* <input type='text' 
            name={this.state.name} 
            onChange={this._handleChangeName}>
          </input> */}
          <input type='text' 
            placeholder='(Clean!) SmackTalk anyone???' 
            value={this.state.message} 
            onChange={this._handleChange} >
          </input>
          <input type='submit' value='Send'></input>

        </form>
        <div className='chatMessages'>
          {this.state.chat}
        </div>
      </div>
    );
  }
}

export default Chat;