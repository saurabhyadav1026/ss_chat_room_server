import mongoose from "mongoose";
import Chat_Room from "../../db/models/chat_room_model.js";




const getRoomByRoomId=async(userId,roomId)=>{


  if(!mongoose.Types.ObjectId.isValid(userId)){
    console.log("invalid roomId ");return {};}

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
      console.log(err)

    }
    
      if(chatsList.length==0)return {}
      return chatsList[0];
    
    
    
    
      
      
    
    


}
export default getRoomByRoomId;