import React, { Component } from 'react';
import HitAudio from './Assets/Sounds/explosionHit.wav';
// import HitAudio from './Assets/Sounds/firecombined.wav';

class HitFX extends Component {

  _shuffleArr = (array) => {
    let i = array.length,
        j = 0,
        temp;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  _getRandomIntInclusive = (min = 0, max = this.state.explosion.length) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor((Math.random() * (max - min + 1)) + min); 
  }

  render() {

    return (
      <audio autoPlay = {true}>
          <source src={HitAudio} type="audio/wav"/>
      </audio>
    );
  }
}

export default HitFX;