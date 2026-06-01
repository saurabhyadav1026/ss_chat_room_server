
import socketAuth from "../middleware/socketAuth.js";
import registerProtectedEvents from "../events-register/registerProtectedEvents.js";
import setOnline from "../../events-operations/user-event-operations/setOnline.js";

const connectUser=async (userIO)=>{
userIO.use(socketAuth);

        userIO.on("connection",async(socket)=>{
console.log("wee will connect the users");

registerProtectedEvents(userIO,socket);

// to make user active for chat
socket.join(socket.userId);
await setOnline(socket);



console.log("public events registerd")
//to register  protected socket events

   












socket.on("disconnect",()=>{

console.log("user disconnected")
});


    });
}

export default connectUser;