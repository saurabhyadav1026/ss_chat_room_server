import { doBlueTick, doOneBlueTick } from "../../db/message-operations/tickUpdate.js";



export const setOneBlueTick=async(io,socket,data)=>{
console.log("we set one blue tick")
    const readTime=await doOneBlueTick(data.msgId)
    data["readTime"]=readTime
    socket.to(data.roomId).emit("u/chats/updateOneBlueTick",data)

}



const setBlueTick=async(io,socket,data)=>{

    const update=await doBlueTick(socket.userId,data.roomId);
    if(!update){
        return;
    }
    update["roomId"]=data.roomId;
    socket.to(data.roomId).emit("u/chats/updateBlueTick",update)

}

export default setBlueTick;