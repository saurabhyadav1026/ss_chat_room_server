

import mongoose from "mongoose";
import { type } from "node:os";














 // schema for chat room 
 /* 
 
 roomType:   my , personal-chat ,private-chat group-chat
 */

const chat_room_schema = new mongoose.Schema({

  roomType:{type:String,default:"personal-chat"},
  members: [{ type: String, ref: "User" }],

})

const Chat_Room = mongoose.model('Chat_Room', chat_room_schema);


export default Chat_Room;












/* 

for peresonal chat

db schema
{
_id:
type:"personal-chat"
member:[mem1_id,mem2_id]
lastMsg_id:
}


to send
{

_id:
type:"[ersonal-chat"
reciever:{
_id:
name:
uername:
about:
}
lastMsg:{
_id:
text:
senderId:
timeStamp:{
send:
delivered:
read:

}
}


}





*/