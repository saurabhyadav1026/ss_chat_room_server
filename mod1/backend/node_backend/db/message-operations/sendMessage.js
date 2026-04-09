import Chat_Room from "../db/models/chat_room_model";
import Message from "../db/models/message_model";







 export const sendMessage=async(senderId,roomId,receiverId,text)=>{

 try {  if(roomId.slice(0,3)=="new"){
    roomId= (await Chat_Room.findOneAndUpdate(
        {members:{$all:[senderId,receiverId],$size:2}},
        {members:[senderId,receiverId]},
        {upsert:true,new:true}
    ))._id
}}
catch{}
return await sendByRoomId(senderId,roomId,receiverId,text);

}



 const sendByRoomId=async (senderId,receiverId,roomId,text)=>{

   

    let tempMsg={
        senderId:senderId,
        text:[{memberId:senderId,text:text},{memberId:receiverId,text:text}],
        roomId:roomId
    }

    const msg=await (new Message(tempMsg)).save();



}


