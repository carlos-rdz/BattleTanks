import React from 'react';
import Miss from './Assets/miss.gif';

const onMiss = () => {
	return (
		<div>
			<img src={Miss} alt="" style={{ maxHeight: 100 + '%', maxWidth: 100 + '%' }} />
		</div>
	);
};

export default onMiss;
