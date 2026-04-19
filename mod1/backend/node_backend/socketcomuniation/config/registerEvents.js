
import events from "./events.js";


export default  (io,socket)=>{


    Object.entries(events).forEach(([event,func ])=> {
        socket.on(event,func(io,socket));
    });

}