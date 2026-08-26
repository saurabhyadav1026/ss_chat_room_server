import { sendMessage } from "../../../db/message-operations/sendMessage.js";
import newRoomId from "../../../db/room-operations/add-room/newRoom.js";
import getRoomByRoomId from "../../../db/room-operations/get-room/getRoomByRoomId.js";




const socketOperationSendMessage = async (io, socket, data) => {
    try {
        const { _id, text } = data;
        let roomId =  await newRoomId(data.roomId);
            if(!roomId){
                   socket.emit("u/chats/messageNotSent", { _id: _id });
                return; 
            }

       
        let res = await sendMessage(socket.userId, roomId, text);

        if (res.status) {

            const sender_room = await getRoomByRoomId(socket.userId, roomId);
          
              const receiver_room = await getRoomByRoomId(sender_room.receiver._id.toString(), roomId);
          
            
            socket.to(sender_room.receiver._id.toString()).emit("u/chats/receiveMsgNotify", { room: receiver_room, message: res.msg });
             
            socket.to(roomId).emit("u/chats/receiveMsg", {message: res.msg });        
            socket.emit("u/chats/messageSent", { room: sender_room, _id: _id, message: res.msg })
          
        }
        else {
            socket.emit("u/chats/messageNotSent", { _id: _id })
        }

    }
    catch (err) {
        console.error("sendMessage Error: "+err)
   socket.emit("u/chats/messageNotSent", { _id: data._id })
        
    }
}


export default socketOperationSendMessage;