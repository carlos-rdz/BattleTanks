import React from 'react';
import MissAudio from './Assets/Sounds/explosionMiss.wav';

const MissFX = () => {
	return (
		<audio autoPlay={true}>
			<source src={MissAudio} type="audio/wav" />
		</audio>
	);
};

export default MissFX;
