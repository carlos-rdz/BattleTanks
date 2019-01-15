import React from 'react';

const Title = () => {
	return (
		<div className="gameTitle">
			<div
				style={{
					color: 'red',
					fontFamily: 'Contrail One, cursive',
					fontSize: '4em'
				}}
			>
				Battle
			</div>
			<div
				style={{
					color: 'blue',
					fontFamily: 'Contrail One, cursive',
					fontSize: '4em'
				}}
			>
				Tanks
			</div>
		</div>
	);
};

export default Title;
