import Message from "../db/models/message_model.js";



export const doOneDoubleTick=async(msgId)=>{
const time=new Date();
await Message.updateOne({_id:msgId},{$set:{tick:2,'tickStatus.deliver':new Date()}})
return time;
}

export const doOneBlueTick=async(msgId)=>{
const time=new Date();

await Message.updateOne({_id:msgId},{$set:{tick:3,'tickStatus.read':time}})
return time;
}


export const doDoubleTick=async(userId)=>{
const updateRooms={};
const deliverTime=new Date()
const msgs=await Message.find({senderId:{$ne:userId},tick:1});
if(msgs.length==0)return null;
await Message.updateMany(
    {senderId:{$ne:userId},tick:1},
    {$set:{tick:2,'tickStatus.deliver':new Date()}}
);

msgs.forEach((msg)=>{
   if( updateRooms[msg.roomId])updateRooms[msg.roomId].push(msg._id.toString());
    else updateRooms[msg.roomId]=[msg._id.toString()]
})

return {deliverTime:deliverTime,updateRooms:updateRooms}

}

export const doBlueTick=async(userId,roomId)=>{
   const updateMsgsId=[];
   const readTime=new Date()
const msgs=await Message.find({roomId:roomId,senderId:{$ne:userId},tick:2},{_id:1});
if(msgs.length==0){return null}
await Message.updateMany(
    {roomId:roomId,senderId:{$ne:userId},tick:2},
    {$set:{tick:3,'tickStatus.read':readTime}}
);

msgs.forEach((msg)=>{
updateMsgsId.push(msg._id.toString());
   
})

return {readTime:readTime,updateMsgsId:updateMsgsId}
}