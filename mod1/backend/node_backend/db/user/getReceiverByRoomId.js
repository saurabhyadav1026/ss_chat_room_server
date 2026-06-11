
import Chat_Room from "../db/models/chat_room_model.js"
import User from "../db/models/user_model.js"


const getReceiverByRoomId=async(userId,roomId)=>{

    console.log(roomId)
    console.log(userId)
const room=await Chat_Room.findOne({_id:roomId},{members:1})
const members=room.members
console.log(members)
console.log(room)
if(members[0]===userId){
  return (await  User.findOne({_id:members[1]},{public_info:1})).public_info
}
else return (await  User.findOne({_id:members[0]},{public_info:1})).public_info
}

export default getReceiverByRoomId;