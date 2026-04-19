import socketOperationSendMessage from "../socketOperations/sendMessage.js";
import setBlueTick, { setOneBlueTick } from "../socketOperations/setBlueTIck.js";
import setDoubleTick, { setOneDoubleTick } from "../socketOperations/setDoubleTick.js";

// event declartion 

  const eventes = {

"u/chats/sendMessage":(io,socket)=>( data={})=>socketOperationSendMessage(io,socket,data),
"u/chats/doOneBlueTick":(io,socket)=>( data={})=>setOneBlueTick(io,socket,data),
"u/chats/doBlueTick":(io,socket)=>( data={})=>setBlueTick(io,socket,data),
"u/chats/doOneDoubleTick":(io,socket)=>( data={})=>setOneDoubleTick(io,socket,data),
}

export default eventes;