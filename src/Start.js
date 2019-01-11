import React from 'react';
import {Link} from 'react-router-dom';       

const Start = (props) => {
    const ws = props.ws;

    let toRender;
    if(props.flattenedArray.length === 17 && props.roomId){
       toRender = <div onClick={()=> { 
            
            props.playerShipLoc(props.flattenedArray);
            ws.send(JSON.stringify({type: 'shipLayoutFlat', value: props.flattenedArray, id: props.roomId }));
            ws.send(JSON.stringify({type: 'shipLayoutDetailed', value: props.shipObj, id: props.roomId }));
            console.log('props.shipObj')
            console.log(props.shipObj)
        }
        }>
        <Link to='/gamestart'>Click to play!</Link>
        </div>
    }else if(!props.roomId && props.flattenedArray.length !== 17){
       toRender =  "Place the rest of your ships"

    }else if(props.roomId && props.flattenedArray.length !== 17){
        toRender =  "Place the rest of your ships"

    }else if(!props.roomId && props.flattenedArray.length === 17){
        toRender = "";
    }

    return (

        <div>
        {toRender}
        </div>
    );
};

export default Start;