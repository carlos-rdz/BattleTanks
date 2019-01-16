import React from 'react';
import HitAudio from './Assets/Sounds/explosionHit.wav';

const HitFX = () => {
	return (
		<audio autoPlay={true}>
			<source src={HitAudio} type="audio/wav" />
		</audio>
	);
};

export default HitFX;
