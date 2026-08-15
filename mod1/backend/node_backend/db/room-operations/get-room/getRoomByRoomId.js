import mongoose from "mongoose";
import Chat_Room from "../../db/models/chat_room_model.js";
import { getLastMessage } from "../../message-operations/getMessages.js";




const getRoomByRoomId_=async(userId,roomId)=>{


  if(!mongoose.Types.ObjectId.isValid(userId)) return null;

       let chatsList = []
 try{     chatsList = await Chat_Room.aggregate([
    { $match: { _id:new mongoose.Types.ObjectId(roomId)
 }},
    
    
        // to get receiver
        {
          $lookup: {
            from: "users",
    
            let: {
              receiverId: {
                $arrayElemAt: [{
                  $filter: {
                    input: "$members",
                    as: "m",
                    cond: { $ne: ["$$m" ,userId] }
                  }
                }, 0]
              }
            },
    
            pipeline: [
              {
                $match: { $expr: { $eq: [{$toString:"$_id"}, "$$receiverId"] } }     // for getting stage variable value we use $$ , and $ for current doc value
              },
              {
    
                $project: {
                  _id: "$_id",
                  dp: "$public_info.dp",
                  username: "$public_info.username",
                  name: "$public_info.name"
    
                }
              }
            ],
            as: "receiver"
          }
    
    
    
        },
    
        {
    
          $addFields: {
            receiver: {$arrayElemAt:["$receiver", 0]},
           
          }
        },
    
        // project for sending data
    
        {
          $project: {
            receiver: 1 
          }
        }
    
      ])
    
    }
    catch(err){
      console.error(err)

    }
    
      if(chatsList.length==0)return null;
      const room=chatsList[0];
      room["lastMessage"]=await getLastMessage(userId,room._id)
      return chatsList[0];
    
    
    
    
      
      
    
    


}



const getRoomByRoomId=async(userId,roomId)=>{
try
{const room_ =await Chat_Room.findById(new mongoose.Types.ObjectId(roomId)) .populate({
    path: 'members',
    match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } }, // exclude current user
    select: '_id public_info.dp public_info.username public_info.name'    // projection
  });

return {
  _id:room_._id,
  receiver:{_id:room_.members[0]._id,...room_.members[0].public_info},
  lastMessage:await getLastMessage(userId,roomId)
}
}
catch(err){
  console.error(err);
  return null;
}

}


export default getRoomByRoomId;





