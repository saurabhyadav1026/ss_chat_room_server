import { Message } from "../db/dbschema.js";



export const getChats = async (userId, roomId) => {

    let chats = [];
    let status = true;

    try {
        chats = await Message.aggregate([
            {
                $match: {
                    roomId: roomId,
                    "texts.memberId": userId
                }
            },

            {
                $project: {
                    _id: 1,
                    senderId: 1,
                    roomId: 1,

                    text: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$texts",
                                    as: "t",
                                    cond: { $eq: ["$$t.memberId", userId] }
                                }
                            },
                            0
                        ]
                    },
                    tickStatus: 1
                }
            },

            {
                $addFields: {
                    text: "$text.text",

                    // if senderId != userId → time = tickStatus.send
                    time: {
                        $cond: [
                            { $ne: ["$senderId", userId] },
                            "$tickStatus.send",
                            "$$REMOVE"
                        ]
                    },

                    // if senderId != userId → tickStatus REMOVE else keep as is
                    tickStatus: {
                        $cond: [
                            { $eq: ["$senderId", userId] },
                            "$tickStatus",
                            "$$REMOVE"
                        ]
                    }
                }
            },

            {
                $project: {
                    _id: 1,
                    senderId: 1,
                    roomId: 1,
                    text: 1,
                    tickStatus: 1,   // available only when sender
                    time: 1          // available only when NOT sender
                }
            }
        ]);
    }
    catch (err) {
        console.log("getChats error:", err);
        status = false;
    }


const list={}
for(const msg of chats){
    list[msg._id]=msg
}

    return { status, data: chats };
};

export default getChats;





export const getMsg = async (userId, msgId) => {
    let chat = [];
    let status = true;

    


    try {
        chat = await Message.aggregate([

            { 
                $match: { 
                    _id:msgId
                   
                }
            }, 

            {
                $project: {
                    _id: 1,
                    senderId: 1,
                    roomId: 1,
                    msgId: 1,
                    tickStatus: 1,

                    text: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$texts",
                                    as: "t",
                                    cond: { $eq: ["$$t.memberId", userId] }
                                }
                            },
                            0
                        ]
                    }
                }
            },

            {
                $addFields: {
                    text: "$text.text",

                    time: {
                        $cond: [
                            { $ne: ["$senderId", userId] },
                            "$tickStatus.send",
                            "$$REMOVE"
                        ]
                    },

                    tickStatus: {
                        $cond: [
                            { $eq: ["$senderId", userId] },
                            "$tickStatus",
                            "$$REMOVE"
                        ]
                    }
                }
            },

            {
                $project: {
                    _id: 1,
                    senderId: 1,
                    roomId: 1,
                    msgId: 1,
                    text: 1,
                    tickStatus: 1,
                    time: 1
                }
            }

        ]);

    } catch (err) {
        console.log("getMsg error:", err);
        status = false;
    }

   

    return chat[0] ;
};





/*

////////=====/////////////* 

const getChats = async (userId, roomId) => {

    let chats=[];
    let status=true;
    try{
    chats = await Message.aggregate([
        { $match: { roomId: roomId, "texts.memberId": userId } },
        {
            $project: {
                               text: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$texts",
                                as: "t",
                                cond: { $eq: ["$$t.memberId", userId] }
                            }
                        }, 0
                    ],

                },
                texts:0,
                
            }
        },
        {
            $addFields: {
                text: "$text.text",
                tick:{
                $cond:[{$ne:["$senderId",userId]},"$$REMOVE","$tick"]
            },
            tickStatus:{$cond:[{$ne:["$senderId",userId]},"$$REMOVE","tickStatus"]}
                      }
        },
       
    ])
    }
    catch{
        status:false;
    }


    return {status:status,data:chats}
}



/* 

chat={
  _id: 1,
                senderId: 1,
                text: "$text.text",
                tick: 1,
                tickStatus: 1,

}

*/

/* 
export const getMsg = async (userId, msgId) => {

    
let chat=[];
let status=true;
     try{ chat = await Message.aggregate([
        { $match: { msgId: msgId, "texts.memberId": userId } },
        {
            $project: {
                               text: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$texts",
                                as: "t",
                                cond: { $eq: ["$$t.memberId", userId] }
                            }
                        }, 0
                    ],

                },
                texts:0,
                
            }
        },
        {
            $addFields: {
                text: "$text.text",
                tick:{
                $cond:[{$ne:["$senderId",userId]},"$$REMOVE","$tick"]
            },
            tickStatus:{$cond:[{$ne:["$senderId",userId]},"$$REMOVE","tickStatus"]}
                      }
        },
       
    ])

     }
     catch{
status:false;
     }


    return {status:status,data:chat[0]};



} */ 