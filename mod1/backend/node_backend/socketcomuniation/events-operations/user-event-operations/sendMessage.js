import { sendMessage } from "../../../db/message-operations/sendMessage.js";
import getRoomByRoomId from "../../../db/room-operations/get-room/getRoomByRoomId.js";

import socketOperationNewRoom from "./newRoom.js";




const socketOperationSendMessage = async (io, socket, data) => {
    try {
        const { _id, text } = data;
        let roomId = data.roomId;
        if (roomId.slice(0, 3) === "new") {
            const res = await socketOperationNewRoom(io, socket, roomId.slice(3));
            if (res.status) roomId = res.roomId;
            else {
                socket.emit("u/chats/messageNotSent", { _id: _id });
                return;
            }
        }

        let res = await sendMessage(socket.userId, roomId, text);

        if (res.status) {

            const sender_room = await getRoomByRoomId(socket.userId, roomId);
              const receiver_room = await getRoomByRoomId(sender_room.receiver._id.toString(), roomId);
          
            
            socket.to(sender_room.receiver._id.toString()).emit("u/chats/receiveMsgNotify", { room: receiver_room, message: res.msg });
             
            socket.to(sender_room._id.toString()).emit("u/chats/receiveMsg", {message: res.msg });        
            socket.emit("u/chats/messageSent", { room: sender_room, _id: _id, message: res.msg })
          
        }
        else {
            socket.emit("u/chats/messageNotSent", { _id: _id })
        }

    }
    catch (err) {
        console.error("sendMessage Error: "+err)
  
        
    }
}


export default socketOperationSendMessage;