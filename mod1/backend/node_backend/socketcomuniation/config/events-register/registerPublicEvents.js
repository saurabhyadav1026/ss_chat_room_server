
import publicEvents from "../events/funchat-events.js";


export default  (io,socket)=>{

    console.log("we registering public events")

    Object.entries(publicEvents).forEach(([event,func ])=> {
        socket.on(event,func(io,socket));
    });

}