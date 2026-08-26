
import mongoose from "mongoose";
import Chat_Room from "../../db/models/chat_room_model.js";
import { isValidateRoomId } from "../../message-operations/getMessages.js";



const newRoomId=async(roomId)=>{

  try{
let mem =roomId.split("-").map(id => new mongoose.Types.ObjectId(id));
if(!isValidateRoomId(roomId)){console.error("Invalid roomId");return null;}
  const room = await Chat_Room.findOneAndUpdate(
  {_id:roomId,
    members: mem
  },
  {
    $setOnInsert: {_id:roomId, members:mem }
  },
  {
    upsert: true,
    new: true
  }
);
return room._id;
  }catch(err){
    console.error(err);
    return null;
  }

}

export default newRoomId;