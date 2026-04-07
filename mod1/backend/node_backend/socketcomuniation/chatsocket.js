import  User  from "../db/db/models/user_model.js";
import  Message from "../db/db/models/message_model.js";
import addMsg from "../db/user/addMsg.js";
import createChatRoom from "../db/user/createChatRoom.js";
import {getMsg} from "../db/user/getMessages.js";
import { getchatRoom } from "../db/user/chatList.js";

import {io} from "../index.js"







const chatsocket = (socket) => {


  

 



 


  // data =   senderId , roomId ,  toUserId, senderCopy,toUserCopy         

  /* 
  
  msg:{
  
  _id: (msgTime+random)
  roomId:
  senderId:
  texts:[{memberId:  , text:}]
  
  }
  
  
  
  */

  socket.on("sendMessage", async (msg) => {
 
try{
    if (msg.roomId===null) {
      
      const members = msg.texts.map(({ memberId }) =>  memberId );
      let newRoom= await createChatRoom(members);
      if(!newRoom)return;
      const roomId =newRoom._id ;
      msg.roomId = roomId;

      // to add chatroom in chatlist
     
    }


    
    const oldMsgId = msg._id;
    delete msg._id;

    const newMsgId = await addMsg(msg);

    // update sender chatlist


    // for single tic in sender

    msg.texts.forEach(async ({ memberId }) => {

      if (memberId == msg.senderId) {
        socket.emit('receivMsg', { room: await getchatRoom(memberId, msg.roomId),oldMsgId:oldMsgId, msg: await getMsg(memberId, newMsgId) });
        
      
      }
      else {
 
   

   /*      if (socketId&&socketId.length > 0) {

          socketId.forEach(async (sId) => {
         if(io.sockets.sockets.has(sId)) io.to(sId).emit('receivMsg', { room: await getchatRoom(memberId, msg.roomId) ,msg: await getMsg(memberId, newMsgId)});
           else {
           await User.updateOne({ _id: memberId }, { $pull:{socketId:sId}})
           }

          })


        }
 */


      }

    




console.log("msg sended bhai")

})
}catch(err){
      console.log(err)
    }
    
  })  






// do double tick

socket.on("doDoubleTick",async(msgId)=>{

try{
   const {tickStatus,senderId,roomId}=await Message.findOneAndUpdate  ({_id:msgId},{$set:{'tickStatus.delivered':new Date()}});
  let {socketId}=await User.findOne({_id:senderId},{socketId:1});
  socketId.forEach(async(s)=>{
    if(io.sockets.sockets.has(s)) io.to(s).emit("updateTick",{roomId:roomId,msgId:msgId,tickStatus:tickStatus})
      else await User.updateOne({_id:senderId},{$pull:{socketId:s}})
  } )
  }
 catch(err){
    console.log(err)
  }


}) 


socket.on("doBlueTick",async(msgId)=>{

 try{ const {tickStatus,senderId,roomId}=await Message.findOneAndUpdate({_id:msgId},{$set:{'tickStatus.read':new Date()}});
  let {socketId}=await User.findOne({_id:senderId},{socketId:1});
  socketId.forEach(async(s)=>{
    if(io.sockets.sockets.has(s)) io.to(s).emit("updateTick",{roomId:roomId,msgId:msgId,tickStatus:tickStatus})
      else await User.updateOne({_id:senderId},{$pull:{socketId:s}})
  })
}
catch(err){
  console.log(err)
}

})



  socket.on('disconnect', async() => {

   try{ await User.updateOne({socketId:{$in:[socket.id]}},{$pull:{socketId:socket.id}})
}
catch(err){
  console.log(err)
}
    
   })
   
  socket.on('doDisconnect', async() => { 

   try{ await User.updateOne({socketId:{$in:[socket.id]}},{$pull:{socketId:socket.id}})
}catch(err){
  console.log(err)

}
    
   })



  }





export default chatsocket;
