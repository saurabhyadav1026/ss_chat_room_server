import { setUserLiveInRoom, setUserOffLiveInRoom } from "../../data/userio/connectedusers.js";

const setLive= (socket,roomId)=>{
try{

  socket.join(roomId);
   setUserLiveInRoom(socket.userId,roomId)
    
  socket.to(roomId).emit("u/chats/setLive",{roomId})
 
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

  socket.leave(roomId);
    setUserOffLiveInRoom(socket.userId,roomId);

    socket.to(roomId).emit("u/chats/setOffLive",{roomId})
    
       return;
}catch(err){
    console.error(err)  
    return
}

}

