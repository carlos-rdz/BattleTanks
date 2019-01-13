import React from 'react';
import Hit from './Assets/firecombined.gif';

const onHit = () => {
	return (
		<div>
			<img src={Hit} alt='explosion' style={{ width: 75 + 'px', height: 75+'px', objectFit: 'none'}} />
		</div>
	);
};

export default onHit;
