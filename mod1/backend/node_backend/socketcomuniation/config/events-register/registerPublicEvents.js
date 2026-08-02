
import funchatEvents from "../events/funchat-events.js";


export default  (io,socket)=>{

    console.log("we registering public events")

    Object.entries(funchatEvents).forEach(([event,func ])=> {
        socket.on(event,func(io,socket));
    });

}