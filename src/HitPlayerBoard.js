import React from 'react';
import HitPlayerBoard from './Assets/hitNoStaticBlank.gif';

const onHit = () => {
	return (
		<div>
			<img src={HitPlayerBoard} alt="" style={{ width: 75 + 'px', height: 75 + 'px' }} />
		</div>
	);
};

export default onHit;
