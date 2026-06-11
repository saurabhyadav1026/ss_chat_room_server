
import { Server} from "socket.io";
import connectFunChat from "./socket-connection/connectFunchat.js";
import connectUser from "./socket-connection/connectUser.js";
import connectCall from "./socket-connection/connectCall.js";


 export const socketIntegration=(server)=>{
    console.log("we are here 4321")
    const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_BASEURL,
    methods: ["GET", "POST"],
   credentials: true
  }
} );


    const funChatIO=io.of("/funchat");
    const userIO=io.of("/u")
    const callIO=io.of("/call")


 connectFunChat(funChatIO);
 connectUser(userIO)
 connectCall(userIO)


    return {io:io,userIO:userIO,funChatIO:funChatIO};
}

