
import { Server} from "socket.io";
import socketAuth from "./middleware/socketAuth.js";
import setOnline from "../socketOperations/setOnline.js";
import registerEvents from "./registerEvents.js";
 export const socketIntegration=(server)=>{
    const io = new Server(server, { cors: { origin:  process.env.FRONTEND_BASEURL} });


     
    io.use(socketAuth);

    io.on("connection",async(socket)=>{
console.log("sbh server socket connected  "+socket.userId);

//to register socket events
registerEvents(io,socket);

// to make user active for chat
socket.join(socket.id);
await setOnline(socket);






socket.on("disconnect",()=>{

console.log("sbh server socket disconnected  "+socket.userId)
});


    });
    






    return io;
}

