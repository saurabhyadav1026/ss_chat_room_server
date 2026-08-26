
import socketOperationSendMessage from "../../events-operations/user-event-operations/sendMessage.js";
import setLive, { setOffLive } from "../../events-operations/user-event-operations/setLive.js";
// event declartion 

  const protectedEvents = {

"u/chats/sendMessage":(io,socket)=>( data={})=>socketOperationSendMessage(io,socket,data),
"u/chats/setLive":(io,socket)=>(data={})=>{setLive(socket,data.roomId)},
"u/chats/setOffLive":(io,socket)=>(data={})=>setOffLive(socket,data.roomId)
}

export default protectedEvents;