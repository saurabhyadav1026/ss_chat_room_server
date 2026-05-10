import protectedEvents from "./events/protectedEvents.js";




export default  (io,socket)=>{


    Object.entries(protectedEvents).forEach(([event,func ])=> {
        socket.on(event,func(io,socket));
    });

} 