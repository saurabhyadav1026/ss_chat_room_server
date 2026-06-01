
import { Server} from "socket.io";
import connectFunChat from "./socket-connection/connectFunchat.js";
import connectUser from "./socket-connection/connectUser.js";
import connectCall from "./socket-connection/connectCall.js";


 export const socketIntegration=async(server)=>{
    console.log("we are here 4321")
    const io = new Server(server, { cors: { origin: "*" }}  );//process.env.FRONTEND_BASEURL} });


    const funChatIO=io.of("/funchat");
    const userIO=io.of("/u")
    const callIO=io.of("/call")


await connectFunChat(funChatIO);
await connectUser(userIO)
await connectCall(callIO)


    return {io:io,userIO:userIO,funChatIO:funChatIO};
}

