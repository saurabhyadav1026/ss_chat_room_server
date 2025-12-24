import { Chat_Room } from "../dbschema.js";
import { toObjId } from "../db.js";


const getChatsList = async (userId) => {
  let chatsList = []
  chatsList = await Chat_Room.aggregate([

    // to find all rooms by checking existing of userId in members list.
    {
      $match: {
        "members": userId,
        roomType: "personal_chat",
      },
    },


    // convert string IDs → ObjectId
    {
      $addFields: {
        unreadCountObj: {
          $arrayElemAt: [{
            $filter: {
              input: "$members",
              as: "m",
              cond: { $eq: ['$$m', userId] }
            }
          }
            , 0]
        },



        reciversObjId: {
          // change the string id into obj id for lookup local field
          $map: {
            input: {
              // find only reciver id 
              $filter: {
                input: "$members",
                as: 'm',
                cond: { $ne: ['$$m', userId] }
              }
            },
            as: "m",
            in: { $toObjectId: '$$m' }
          },

        }


      },

    },

    {
      $lookup: {
        from: "users",
        localField: "reciversObjId",
        foreignField: "_id",
        as: "receivers",
      }
    },
    { $addFields: { receiver: { $arrayElemAt: ['$receivers', 0] } } },

    {
      $project: {
        _id: 1,
        members: 1,
        unreadCount: '$unreadCountObj.unreadCount',
        name: "$receiver.public_info.name",
        roomName: "$receiver.public_info.username",
        roomDP: "$receiver.public_info.dp",
        
      },
    },
  ]);
  

 
  const list={}
for( const chat of chatsList){
list[chat._id]=chat
}
  

  return list
}

export default getChatsList;








export const getchatRoom = async (userId, roomId) => {
 

  let chatlist = [];

  chatlist = await Chat_Room.aggregate([
    {
      $match: {
        "members": userId,
        roomType: "personal_chat",
        _id: toObjId(roomId),
      },
    },

   
    // convert string IDs → ObjectId
    {
      $addFields: {
        


        reciversObjId: {
          // change the string id into obj id for lookup local field
          $map: {
            input: {
              // find only reciver id 
              $filter: {
                input: "$members",
                as: 'm',
                cond: { $ne: ['$$m', userId] }
              }
            },
            as: "m",
            in: { $toObjectId: '$$m' }
          },

        }


      },

    },

    {
      $lookup: {
        from: "users",
        localField: "reciversObjId",
        foreignField: "_id",
        as: "receivers",
      }
    },
    { $addFields: { receiver: { $arrayElemAt: ['$receivers', 0] } } },

    {
      $project: {
        _id: 1,
        members: 1,
        name: "$receiver.public_info.name",
        roomName: "$receiver.public_info.username",
        roomDP: "$receiver.public_info.dp",
       
      },
    },
  ]);

  return chatlist[0];
};
