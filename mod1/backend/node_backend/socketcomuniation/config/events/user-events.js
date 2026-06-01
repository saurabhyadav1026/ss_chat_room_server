
import socketOperationSendMessage from "../../events-operations/user-event-operations/sendMessage.js";
import setBlueTick, { setOneBlueTick } from "../../events-operations/user-event-operations/setBlueTick.js";
import { setOneDoubleTick } from "../../events-operations/user-event-operations/setDoubleTick.js";
// event declartion 

  const protectedEvents = {

"u/chats/sendMessage":(io,socket)=>( data={})=>socketOperationSendMessage(io,socket,data),
"u/chats/doOneBlueTick":(io,socket)=>( data={})=>setOneBlueTick(io,socket,data),
"u/chats/doBlueTick":(io,socket)=>( data={})=>setBlueTick(io,socket,data),
"u/chats/doOneDoubleTick":(io,socket)=>( data={})=>setOneDoubleTick(io,socket,data),

}

export default protectedEvents;