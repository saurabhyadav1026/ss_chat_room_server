import { sendMessage } from "../../db/message-operations/sendMessage.js";
import socketOperationNewRoom from "./newRoom.js";

import getRoomByRoomId from "../../db/room-operations/get-room/getRoomByRoomId.js";



const socketOperationSendMessage = async (io, socket, data) => {
    
    const { _id,  text } = data;
    let roomId=data.roomId;
    if (roomId.slice(0, 3) == "new") {
        const res = await socketOperationNewRoom(io, socket, roomId.slice( 3));
        if (res.status) roomId = res.roomId;
        else socket.emit("u/chats/messageNotSent", { _id: _id });
        return;
    }

    let res = await sendMessage(socket.userId,roomId, text);

    if (res.status) {

        const room = await getRoomByRoomId(socket.userId, roomId);
        
        socket.to(roomId).emit("u/chats/receiveMsg", {room:room, message: res.msg });

        socket.emit("u/chats/messageSent", {room:room, _id: _id, message: res.msg })
    }
    else {
        socket.emit("u/chats/messageNotSent", { _id: _id })
    }


}


export default socketOperationSendMessage;