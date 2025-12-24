import { Chat_Room, Message } from "../dbschema.js"


export const doAllDoubleTick = async (reciverId) => {

    const list = await Message.aggregate([
        {
            $match: {
                'texts.memberId': reciverId,
                senderId: { $ne: reciverId },
                'tickStatus.delivered': null
            }
        },
        {
            $project: {
                _id: 1,
                senderId: 1

            }
        }


    ])

    await Message.updateMany({ _id: { $in: list.map(m => m._id) } }, { $set: { 'tickStatus.delivered': new Date() } })
    console.log(list)
    console.log("sbhsoalldouble")
}

export const doAllBlueTick = async(reciverId, roomId) => {
   await Message.updateMany({
         roomId: roomId ,
         senderId:{$ne:reciverId},
         'tickStatus.read':null
    },{$set:{'tickStatus.read':new Date()}})
    console.log("bluetick done")
    return;
}