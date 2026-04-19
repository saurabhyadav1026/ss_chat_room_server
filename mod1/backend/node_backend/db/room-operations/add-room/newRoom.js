
import Chat_Room from "../../db/models/chat_room_model.js";



const newRoomId=async(userId,receiverId)=>{

let mem=([userId,receiverId].sort());
   const room = await Chat_Room.findOneAndUpdate(
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