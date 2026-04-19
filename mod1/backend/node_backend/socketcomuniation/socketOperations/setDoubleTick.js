import { doDoubleTick, doOneDoubleTick } from "../../db/message-operations/tickUpdate.js"



export const setOneDoubleTick=async(io,socket,data)=>{

    const deliverTime=await doOneDoubleTick(data.msgId)
    data["deliverTime"]=deliverTime
    socket.to(data.roomId).emit("u/chats/updateOneDoubleTick",data)

}




const setDoubleTick=async(socket)=>{

    const update=await doDoubleTick(socket.userId);
    if(!update){;return}

    Object.keys(update.updateRooms).forEach((roomId)=>{
   socket.to(roomId).emit("u/chats/updateDoubleTick",update)
    })

}

export default setDoubleTick;