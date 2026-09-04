import { sendMessage } from "../../../db/message-operations/sendMessage.js";
import newRoomId from "../../../db/room-operations/add-room/newRoom.js";
import getRoomByRoomId, { getSenderReceiverRoom } from "../../../db/room-operations/get-room/getRoomByRoomId.js";




const socketOperationSendMessage = async (io, socket, data) => {
    try {
        const { _id, text } = data;
        let roomId =  await newRoomId(data.roomId);
            if(!roomId){
                   socket.emit("u/chats/messageNotSent", { _id: _id });
                return; 
            }

       
        let msg = await sendMessage(socket.userId, roomId, text);

        if (msg) {

            const [sender_room ,receiver_room] = await getSenderReceiverRoom(socket.userId, roomId);
        
            socket.to(sender_room.receiver._id.toString()).emit("u/chats/receiveMsgNotify", { room: receiver_room, message: msg });
             
            socket.to(roomId).emit("u/chats/receiveMsg", {message: msg });        
            socket.emit("u/chats/messageSent", { room: sender_room, _id: _id, message: msg })
          
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