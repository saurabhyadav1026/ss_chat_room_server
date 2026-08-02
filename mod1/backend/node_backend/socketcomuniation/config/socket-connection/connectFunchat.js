
import registerPublicEvents from "../events-register/registerPublicEvents.js";



const connectFunChat=(funChatIO)=>{

   
funChatIO.on("connection" ,(socket)=>{

//to register  public socket events
registerPublicEvents(funChatIO,socket);



}

);
}

export default connectFunChat;