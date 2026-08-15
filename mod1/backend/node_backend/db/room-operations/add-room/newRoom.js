
import mongoose from "mongoose";
import Chat_Room from "../../db/models/chat_room_model.js";



const newRoomId=async(userId,receiverId)=>{
let mem = [userId.toString(), receiverId.toString()].sort().map(id => new mongoose.Types.ObjectId(id));  const room = await Chat_Room.findOneAndUpdate(
  {
    members: mem
  },
  {
    $setOnInsert: { members:mem }
  },
  {
    upsert: true,
    new: true
  }
);
return room._id;

}

export default newRoomId;