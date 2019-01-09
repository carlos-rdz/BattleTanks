import React from 'react';

const Start = (props) => {
    return (

        <button onClick={()=>props.playerShipLoc(props.flattenedArray)}>Set Pieces</button>
    );
};

export default Start;