import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      name: '', 
      value: '',
    }
  }
  _handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  _handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    console.log("message submitted")
    
  }

  render() {
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
            value={this.state.value} 
            onChange={this._handleChange} >
          </input>
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