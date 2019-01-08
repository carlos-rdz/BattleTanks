import React from 'react';

const Start = (props) => {
    return (

        <button onClick={()=>props.playerPieceLoc(props.flattenedArray)}>Set Pieces</button>
    );
};

export default Start;