
import registerPublicEvents from "../events-register/registerPublicEvents.js";



const connectFunChat=async(funChatIO)=>{

funChatIO.on("connection" ,(socket)=>{

//to register  public socket events
registerPublicEvents(funChatIO,socket);
socket.on("hello",()=>{
    console.log("funchat socket is saying hello to us")
})



socket.on("disconnect",()=>{
    console.log("funchat user disconnected")
})

}

);
}

export default connectFunChat;