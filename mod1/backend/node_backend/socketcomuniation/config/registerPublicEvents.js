
import publicEvents from "./events/publicEvents.js";


export default  (io,socket)=>{


    Object.entries(publicEvents).forEach(([event,func ])=> {
        socket.on(event,func(io,socket));
    });

}