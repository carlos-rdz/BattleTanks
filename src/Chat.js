import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      name: '', 
    }
  }
  
  _handleChat = (e) => {
    console.log("message passed to handleChat")
    console.log(e)
  }

  render() {
    return (
      <div>
        {/* return both an input form and a chat history div */}
        <form onSubmit={(e) => { 
          this._handleChat(e) 
          e.preventDefault();
        }}>
          <input type='text' name='name'></input>
          <input type='text' placeholder='(Clean!) SmackTalk anyone???'></input>
          <input type='submit' value='Send'></input>

        </form>
        <div className='chatMessages'>
          messages go here
        </div>
      </div>
    );
  }
}

export default Chat;