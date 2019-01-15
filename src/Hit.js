import React from 'react';
import Hit from './Assets/explosion.gif';

const onHit = () => {
	return (
		<div>
			<img src={Hit} alt='' style={{ width: 80+'px', height: 80+'px'}} />
		</div>
	);
};

export default onHit;
