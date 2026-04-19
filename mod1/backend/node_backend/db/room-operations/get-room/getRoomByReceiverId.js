import test from "node:test";
import User from "../../db/models/user_model.js";
import Chat_Room from "../../db/models/chat_room_model.js";





const getRoomByReceiverId=async(userId,receiverId)=>{


  let chatsList = []
  chatsList = await Chat_Room.aggregate([

    { $match: { members:{$all:[ userId ,receiverId],$size:2}} },


    // to get receiver
    {
      $lookup: {
        from: "users",

       
        pipeline: [
          {
            $match: { $expr: { $eq: [{$toString:"$_id"}, receiverId] } }     // for getting stage variable value we use $$ , and $ for current doc value
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





    // to get last message


    {
      $lookup: {
        from: "messages",
        let: { roomId: "$_id" },
        pipeline: [
          { $match: { $expr:{$eq:["$roomId", {$toString:"$$roomId"}] } }},
          { $sort: { _id: -1 } },
          { $limit: 1 },
          {$addFields:{
            text:{$arrayElemAt:[
              {$filter:{
                input:"$texts",
                as:"t",
                cond:{$eq:["$$t.memberId",userId]}
              }}

            ,0]}
          }},
          {$project:{
            _id:1,
            senderId:1,
            text:{$ifNull:["$text.text","nan"]}

          }
            
          }

        ],
        as: "lastMessage"

      }
    },


    {

      $addFields: {
        receiver: {$arrayElemAt:["$receiver", 0]},
        lastMessage: {$arrayElemAt:["$lastMessage", 0]}
      }
    },

    // project for sending data

    {
      $project: {
        _id: 1,
        receiver: 1,
        lastMessage: 1


      }
    }

  ])


if(chatsList.length==0)return getNewDummyRoom(receiverId);



  return chatsList[0];

  
  




}
export default getRoomByReceiverId;



export const getNewDummyRoom=async(receiverId)=>{




let user = await User.findOne({_id:receiverId},{_id:1,public_info:1})
    
    if(!user)return {};
          
   const room={

      _id:"new"+user._id,
        receiver: {
              _id: user._id,
              dp: user.public_info.dp,
              username: user.public_info.username,
              name: user.public_info.name

            },
            lastMessage:{
                id:"",
                senderId:"",
                test:""
            }
       
      }
  return room;

}



export const  getRoomIdByReceiverId=async(userId,receiverId)=>{

try{const room = await Chat_Room.findOne({ members:{$all:[ userId ,receiverId],$size:2}},{_id:1});
if(room)return {status:true,roomId:room._id};
else return{staus:true,roomId:"new"+receiverId}
}catch(err){
  console.log(err);

}
return {status:false};
}