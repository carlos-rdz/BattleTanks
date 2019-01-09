import React from 'react';
import uuid from 'uuid/v4';
const ws = new WebSocket("ws://localhost:3001");

const Start = (props) => {
    const id = uuid();

    return (
        <button onClick={()=> {
            props.playerShipLoc(props.flattenedArray);
            ws.send(JSON.stringify({type: 'shipLayoutFlat', value: props.flattenedArray, id: id }));
            ws.send(JSON.stringify({type: 'shipLayoutDetailed', value: props.sunkStatus, id: id }));
            props.setSocketID(id);
        }
        }>Set Pieces</button>
    );
};

export default Start;