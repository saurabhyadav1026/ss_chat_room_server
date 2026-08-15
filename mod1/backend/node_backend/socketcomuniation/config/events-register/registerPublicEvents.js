
import funchatEvents from "../events/funchat-events.js";


export default  (io,socket)=>{

      Object.entries(funchatEvents).forEach(([event,func ])=> {
        socket.on(event,func(io,socket));
    });

}