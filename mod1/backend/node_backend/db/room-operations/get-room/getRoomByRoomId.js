import mongoose from "mongoose";
import Chat_Room from "../../db/models/chat_room_model.js";
import { getLastMessage } from "../../message-operations/getMessages.js";
import User from "../../db/models/user_model.js";
import { isUserActive, isUserLiveInRoom } from "../../../socketcomuniation/data/userio/connectedusers.js";




const getRoomByRoomId=async(userId,roomId)=>{
try
{
 
  const room_ =await Chat_Room.findById(roomId) .populate({
    path: 'members',
    match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } }, // exclude current user
    select: '_id public_info.dp public_info.username public_info.name'    // projection
  });
 
  if(!room_){
    return null;}

  // fort self room
  if(room_.members.length==0  ){

 const members= roomId.split("-");
  if(members.length!=2 || (members[0]!==members[1] && userId===members[0]))return null;

  const user = await User.findOne({_id:userId},{_id:1,public_info:1});
user.public_info.name=user.public_info.name+" (You)"
room_.members=[user];
  }
  
return {
  _id:room_._id,
  receiver:{
    _id:room_.members[0]._id,
    isUserActive:isUserActive(room_.members[0]._id.toString())?true:false,
    ...(room_.members[0].public_info)},
  isLive:isUserLiveInRoom(room_.members[0]._id.toString(),room_._id)?true:false,
  lastMessage:await getLastMessage(userId,roomId)
}
}
catch(err){
  console.error(err);
  return null;
}

}


export default getRoomByRoomId;





