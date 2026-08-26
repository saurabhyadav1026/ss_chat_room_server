
import mongoose from "mongoose";
import Chat_Room from "../../db/models/chat_room_model.js";
import { getLastMessage } from "../../message-operations/getMessages.js";
import User from "../../db/models/user_model.js";
import { isUserActive, isUserLiveInRoom } from "../../../socketcomuniation/data/userio/connectedusers.js";



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
  if(room.members.length===0){
    
 const members= room._id.split("-");
  if(members.length!=2 || (members[0]!==members[1] && userId===members[0]))return null;

  const user = await User.findOne({_id:userId},{_id:1,public_info:1});
  if(!user){
    return 0;
  }
user.public_info.name=user.public_info.name+" (You)"
room.members=[user];
  };
 
rooms[room._id]={
  _id:room._id,
  receiver:{   _id:room.members[0]._id,
        isUserActive:isUserActive(room.members[0]._id.toString())?true:false,
        ...(room.members[0].public_info)},
      isLive:isUserLiveInRoom(room.members[0]._id.toString(),room._id)?true:false,
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

