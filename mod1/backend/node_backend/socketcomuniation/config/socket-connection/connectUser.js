
import socketAuth from "../middleware/socketAuth.js";
import registerProtectedEvents from "../events-register/registerProtectedEvents.js";
import setOnline from "../../events-operations/user-event-operations/setOnline.js";
import { setOffLive } from "../../events-operations/user-event-operations/setLive.js";

const connectUser=(userIO)=>{
userIO.use(socketAuth);

        userIO.on("connection",async(socket)=>{

registerProtectedEvents(userIO,socket);

// to make user active for chat

await setOnline(socket);


//to register  protected socket events

   












socket.on("disconnect",(socket)=>{
   
});


    });
}

export default connectUser;