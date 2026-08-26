import { setUserLiveInRoom, setUserOffLiveInRoom } from "../../data/userio/connectedusers.js";

const setLive= (socket,roomId)=>{
try{
   setUserLiveInRoom(socket.userId,roomId)
    socket.join(roomId);
  socket.to(roomId).emit("u/chats/setLive")
 
return;
}
  catch(err){
    console.error(err)
    return;
  }
}

export default setLive;



export const setOffLive=(socket,roomId)=>{
try{
    setUserOffLiveInRoom(socket.userId,roomId)
socket.leave(roomId);
    socket.to(roomId).emit("u/chats/setOffLive")
       return;
}catch(err){
    console.error(err)
    return
}

}
