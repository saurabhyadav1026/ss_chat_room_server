import { User } from "../db/dbschema.js";
import addMsg from "../db/user/addMsg.js";
import getchatList, { getchatRoom } from "../db/user/chatList.js";
import createChatRoom from "../db/user/createChatRoom.js";
import getChats ,{getMsg} from "../db/user/getChats.js";
import getSearchList from "../db/user/searchList.js";


import {io} from "../index.js"







const chatsocket = (socket) => {


  console.log("connected");

  socket.emit("getConnect");
  console.log("we requested for socket register")


  // data= userId
  socket.on("setConnected", async (data) => {
console.log("hum 1 pr hai:     "+socket.id)
    await User.updateOne({ _id: data.userId },{$addToSet:{socketId:socket.id}})

 socket.emit('setChatList', { chatlist: await getchatList(data.userId) });
    console.log("user socket done")

  })



  // data=userId
  socket.on('getChatList', async (data) => {

console.log("tmhe iski chat chahiye")
console.log(data.userId)
    socket.emit('setChatList', { chatlist: await getchatList(data.userId) });
    console.log("chatList updated")
  })
  // data=userId


  socket.on('getFriendList', async (searchInput) => {

    socket.emit('setChatList', { chatlist: await getSearchList(searchInput.searchInput) });
    console.log("searchList updated")

  })



  // data= roomId ,userId=forUserId
  socket.on("getChat", async (data) => {

    const { userId, roomId } = data;
    const chat = await getChats(userId, roomId)
    console.log(" wh get chatssssss of  "+userId+"   room "+roomId)
    console.log(chat)
    socket.emit("setChat", { chat: chat.data });
    console.log("chat sended")
  })


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






    console.log("abhyadav")
    console.log(msg)


    if (msg.roomId===null) {
      const members = msg.texts.map(({ memberId }) => ({ memberId }));
      const roomId = await createChatRoom(members);
      msg.roomId = roomId;

      // to add chatroom in chatlist
      //socket.emit("newChatRoom", await getChatRoom(msg.senderId,roomId))
    }


    //  socket.emit("newChatAdd", { oldRoomId: oldRoomId, newRoomId: msg.roomId })

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
 
        const {socketId } = (await User.findOne({ _id: memberId }, { _id:0, socketId: 1 }))

console.log("mhsdgfwshgdfukerhfckujh")
console.log(socketId)
        if (socketId&&socketId.length > 0) {

          socketId.forEach(async (sId) => {
         if(io.sockets.sockets.has(sId)) io.to(sId).emit('receivMsg', { room: await getchatRoom(memberId, msg.roomId) ,msg: await getMsg(memberId, newMsgId)});
           else {
           await User.updateOne({ _id: memberId }, { $pull:{socketId:sId}})
           }

          })


        }



      }
    })




console.log("msg sended bhai")

  })








  socket.on('disconnect', async() => { console.log("arr kya kr rha")

    await User.updateOne({socketId:{$in:[socket.id]}},{$pull:{socketId:socket.id}})
    console.log("socket removed:  "+socket.id)
    
   })
   
  socket.on('doDisconnect', async() => { console.log("arr kya kr rha")

    await User.updateOne({socketId:{$in:[socket.id]}},{$pull:{socketId:socket.id}})
    console.log("socket removed:  "+socket.id)
    
   })

}





export default chatsocket;
