import { setUserLiveInRoom, setUserOffLiveInRoom } from "../../data/userio/connectedusers.js";

const setLive= (socket,roomId)=>{
try{
   setUserLiveInRoom(socket.userId,roomId)
    socket.join(roomId);
  socket.to(roomId).emit("u/chats/setLive")
  console.log("you are live")
return;
}
  catch(err){
    console.log(err)
    return;
  }
}

export default setLive;



export const setOffLive=(socket,roomId)=>{
try{
    setUserOffLiveInRoom(socket.userId,roomId)
socket.leave(roomId);
    socket.to(roomId).emit("setOffLive")
    console.log("you are off  live")
    return;
}catch(err){
    console.log(err)
    return
}

}
