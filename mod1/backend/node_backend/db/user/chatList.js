import Chat_Room from "../db/models/chat_room_model.js";

const getChatsList = async (userId) => {


  let chatsList = []
  chatsList = await Chat_Room.aggregate([

    { $match: { members: userId } },


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





  const list = {}
  for (const chat of chatsList) {
    list[chat._id] = chat
  }

  return list
}

export default getChatsList;






// userId=receiver Id

export const getchatRoom = async (userId, roomId) => {


   let chatsList = []
  chatsList = await Chat_Room.aggregate([
{ $match: { $expr:{$eq:[roomId, {$toString:"$_id"}] } }},


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



  if(chatsList.length==0)return {}
  return chatsList[0];




  
  


};
