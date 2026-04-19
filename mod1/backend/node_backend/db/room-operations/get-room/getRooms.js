
import Chat_Room from "../../db/models/chat_room_model.js";
import { getLastMessage } from "../../message-operations/getMessages.js";





const getRooms=async(userId)=>{


  let chatsList = []
  chatsList = await Chat_Room.aggregate([

    { $match: { members:userId} },
    {
      $addFields:{
        receiverId:{ $toObjectId:{
          $arrayElemAt:[
            {
              $filter:{
                input:"$members",
                as:"m",
                cond:{$ne:["$$m",userId]}
              }

            },0
          ]}}
      }
    },
    {
     $lookup:{
          from:"users",
          localField:"receiverId",
          foreignField:"_id",
          as:"receiver_"
        
      }
    },
    
    {
  $unwind: {
    path: "$receiver_",
    preserveNullAndEmptyArrays: true
  }
},
{
  $project:{
    _id:1,
    receiver:"$receiver_.public_info",
  }
}
  ]);

const rooms={};
await Promise.all(chatsList.map(async(room)=>{
rooms[room._id.toString()]=room;
rooms[room._id.toString()]["lastMessage"]=await getLastMessage(userId,room._id.toString());
}))

  return rooms;

  
  




}
export default getRooms;

