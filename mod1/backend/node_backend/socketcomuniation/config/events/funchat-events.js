

// event declartion 
import deleteMsg from "../../events-operations/funchats-event-operations/deleteMsg.js";
import disconnectWithRoom from "../../events-operations/funchats-event-operations/disconnectWithRoom.js";
import findAndJoinRoom, { findAndJoinPrivateRoom } from "../../events-operations/funchats-event-operations/findAndJoinRoom.js";
import sendMsg from "../../events-operations/funchats-event-operations/sendMsg.js";






  const   publicEvents= {


"findAndJoinFunRoom":(io,socket)=>( data={})=>findAndJoinRoom(io,socket,data),
"findAndJoinPrivateRoom":(io,socket)=>( data={})=>findAndJoinPrivateRoom(io,socket,data),

"sendMsg":(io,socket)=>( data={})=>sendMsg(io,socket,data),
"deleteMsg":(io,socket)=>( data={})=>deleteMsg(io,socket,data),



"disconnect":(io,socket)=>( data={})=>disconnectWithRoom(io,socket,data),
}

export default publicEvents;  