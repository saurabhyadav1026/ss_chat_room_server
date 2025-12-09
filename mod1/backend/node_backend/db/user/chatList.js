import { Chat_Room } from "../dbschema.js";
import { toObjId } from "../db.js";


const getChatsList=async (userId)=>{
let chatsList = []
chatsList=await Chat_Room.aggregate([
  {
    $match: {
      "members.memberId": userId,
      roomType: "personal_chat",
    },
  },

  // convert string IDs → ObjectId
  {
    $addFields: {
      membersObjId: {
        $map: {
          input: "$members",
          as: "m",
          in: {
            memberId: { $toObjectId: "$$m.memberId" }
          }
        }
      }
    }
  },

  {
    $lookup: {
      from: "users",
      localField: "membersObjId.memberId",
      foreignField: "_id",
      as: "receivers",
    },
  },

  // find the other guy
  {
    $addFields: {
      receiver: {
        $arrayElemAt: [
          {
            $filter: {
              input: "$receivers",
              as: "m",
              cond: { $ne: ["$$m._id", toObjId(userId)] }
            }
          },
          0
        ]
      }
    }
  },

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
return chatsList
}

export default getChatsList;

export const getchatRoom = async (userId, roomId) => {
  if (typeof userId !== "string") {
    console.log("userId is not a string");
    return [];
  }

  let chatlist = [];

  chatlist = await Chat_Room.aggregate([
    {
      $match: {
        "members.memberId": userId,
        roomType: "personal_chat",
        _id: toObjId(roomId),
      },
    },

    // convert string → ObjectId for lookup
    {
      $addFields: {
        membersObjId: {
          $map: {
            input: "$members",
            as: "m",
            in: {
              memberId: { $toObjectId: "$$m.memberId" }
            }
          }
        }
      }
    },

    {
      $lookup: {
        from: "users",
        localField: "membersObjId.memberId",
        foreignField: "_id",
        as: "receivers",
      },
    },

    {
      $lookup: {
        from: "messages",
        localField: "_id",
        foreignField: "lastMsgId",
        as: "lastMsg",
      },
    },

    {
      $addFields: {
        unreadCounts: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$receivers",
                as: "m",
                cond: { $eq: ["$$m._id", toObjId(userId)] },
              },
            },
            0,
          ],
        },

        receiver: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$receivers",
                as: "m",
                cond: { $ne: ["$$m._id", toObjId(userId)] },
              },
            },
            0,
          ],
        },
      },
    },

    {
      $project: {
        members: 1,
        _id: 1,
        unreadCount: "$unreadCounts.unreadCount",
        name: "$receiver.public_info.name",
        roomName: "$receiver.public_info.username",
        roomDP: "$receiver.public_info.dp",
      },
    },
  ]);

  return chatlist[0];
};
