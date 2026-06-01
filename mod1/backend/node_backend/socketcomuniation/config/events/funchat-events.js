

// event declartion 

import createRoom from "../../events-operations/funchats-event-operations/createRoom.js";
import deleteMsg from "../../events-operations/funchats-event-operations/deleteMsg.js";
import sendMsg from "../../events-operations/funchats-event-operations/sendMsg.js";

  const   publicEvents= {

"createRoom":(io,socket)=>( data={})=>createRoom(io,socket,data),
"sendMsg":(io,socket)=>( data={})=>sendMsg(io,socket,data),
"findAndJoinFunRoom":(io,socket)=>( data={})=>findAndJoinFunRoom(io,socket,data),
"deleteMsg":(io,socket)=>( data={})=>deleteMsg(io,socket,data),

}

export default publicEvents;  