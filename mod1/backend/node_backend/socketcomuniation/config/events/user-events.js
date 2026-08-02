
import socketOperationSendMessage from "../../events-operations/user-event-operations/sendMessage.js";
// event declartion 

  const protectedEvents = {

"u/chats/sendMessage":(io,socket)=>( data={})=>socketOperationSendMessage(io,socket,data)
}

export default protectedEvents;