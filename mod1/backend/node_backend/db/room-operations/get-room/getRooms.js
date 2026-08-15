
import mongoose from "mongoose";
import Chat_Room from "../../db/models/chat_room_model.js";
import { getLastMessage } from "../../message-operations/getMessages.js";



const getRooms_=async(userId,page)=>{


  let chatsList = await Chat_Room.aggregate([

    { $match: { members:new mongoose.Types.ObjectId(userId)} },
    
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

const roomsIdList=Object.keys(rooms);

  return {
    rooms,
    roomsIdList,
    nextPage:undefined,
    hasMore:false

  };

  
  




}






const getRooms=async(userId,page=1)=>{


 const rooms_ =await Chat_Room.find({members:new mongoose.Types.ObjectId(userId)}) .populate({
     path: 'members',
     match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } }, // exclude current user
     select: '_id public_info.dp public_info.username public_info.name'    // projection
   });
 
const rooms={}
 await Promise.all(rooms_.map(async(room)=>{
rooms[room._id]={
  _id:room._id,
  receiver:room.members[0].public_info,
  lastMessage:await getLastMessage(userId,room._id.toString())
}
return 0;
 })
)

const roomsIdList=Object.keys(rooms);

  return {
    rooms,
    roomsIdList,
    nextPage:undefined,
    hasMore:false

  };

  
  
}



export default getRooms;

