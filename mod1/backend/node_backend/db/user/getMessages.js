import mongoose from "mongoose";
import Message from "../db/models/message_model.js";



export const getMessages = async (userId, roomId) => {
  console.log("msg   sbhhh")
  console.log(userId)

    let chats = [];
    let status = true;

    try {
        chats = await Message.aggregate(
             [
          { $match: { roomId:roomId }},
          { $sort: { _id: 1 } },
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
            text:{$ifNull:["$text.text","sbhnull"]},
            roomId:1

          }
            
          }

        ]
        );
        
    }
    catch (err) {
        console.log("getChats error:", err);
        status = false;
    }


const list={}
for(const msg of chats){
    list[msg._id]=msg
}

console.log("mmm");
console.log(list)
    return  list ;
};







export const getMsg = async (userId, msgId) => {
    let chat = [];
    let status = true;

    
    


    try {
        chat = await Message.aggregate( [
          { $match: { msgId:msgId }},
          { $sort: { _id: 1 } },
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

        ]);

    } catch (err) {
        console.log("getMsg error:", err);
        status = false;
    }

   

    return chat[0] ;
};



