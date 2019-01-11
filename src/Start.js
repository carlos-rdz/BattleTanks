import React from 'react';

const Start = (props) => {
    const ws = props.ws;

    return (
        <button onClick={()=> {
            props.playerShipLoc(props.flattenedArray);
            ws.send(JSON.stringify({type: 'shipLayoutFlat', value: props.flattenedArray, id: props.roomId }));
            ws.send(JSON.stringify({type: 'shipLayoutDetailed', value: props.shipObj, id: props.roomId }));
            console.log('props.shipObj')
            console.log(props.shipObj)
        }
        }>Set Pieces</button>
    );
};

export default Start;