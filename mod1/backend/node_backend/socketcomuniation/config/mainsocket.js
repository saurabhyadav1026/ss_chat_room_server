
import { Server} from "socket.io";
import socketAuth from "./middleware/socketAuth.js";
import setOnline from "../socketOperations/setOnline.js";
import registerEvents from "./registerProtectedEvents.js";
import registerPublicEvents from "./registerPublicEvents.js";
import registerProtectedEvents from "./registerProtectedEvents.js";
 export const socketIntegration=(server)=>{
    const io = new Server(server, { cors: { origin:  process.env.FRONTEND_BASEURL} });


     
    io.use(socketAuth);

    io.on("connection",async(socket)=>{

//to register  public socket events
registerPublicEvents(io,socket);


//to register  protected socket events
if(socket.userId){
     
registerProtectedEvents(io,socket);

// to make user active for chat
socket.join(socket.userId);
await setOnline(socket);

}











socket.on("disconnect",()=>{
});


    });
    






    return io;
}

