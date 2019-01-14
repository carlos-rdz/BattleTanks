import React, { Component } from 'react';
import Boom1 from './Assets/Sounds/explosion1.wav';
import Boom2 from './Assets/Sounds/explosion2.wav';
import Boom3 from './Assets/Sounds/explosion3.wav';
import HitAudio from './Assets/Sounds/firecombined.wav';

class HitFX extends Component {
  constructor(props) {
    super(props);
    this.state=({
      explosion: [Boom1,Boom2,Boom3],
      usedSounds: [],
    })
  }
  
 

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
    let Boom = this.state.explosion[this._getRandomIntInclusive()]

    return (
      <audio autoPlay = {true}>
          <source src={HitAudio} type="audio/wav"/>
      </audio>
    );
  }
}

export default HitFX;