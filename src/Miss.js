import React from 'react';
import Miss from './Assets/misscombined.gif';

const onMiss = () => {
	return (
		<div>
			<img src={Miss} alt=' billowing smoke' style={{ width: 75 + 'px', height: 75+'px', objectFit: 'none'}} />
		</div>
	);
};

export default onMiss;
