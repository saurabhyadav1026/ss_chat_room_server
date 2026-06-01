
import { Server} from "socket.io";


 export const socketIntegration=(server)=>{
    const io = new Server(server, { cors: { origin:  process.env.FRONTEND_BASEURL+"funchat"} });


     
    io.use(socketAuth);

    io.on("connection",async(socket)=>{






socket.on("disconnect",()=>{
});


    });
    






    return io;
}

