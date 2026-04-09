
import { Server} from "socket.io";
import socketAuth from "./socketAuth.js";
 export const socketIntegration=(server)=>{
    const io = new Server(server, { cors: { origin:  process.env.FRONTEND_BASEURL} });


     
    io.use(socketAuth);

    io.on("connection",(socket)=>{


console.log("sbh server socket connected  "+socket.userId)

socket.on("disconnect",()=>{

console.log("sbh server socket disconnected  "+socket.userId)
});


    });
    






    return io;
}




