
import getRoomsId from "../../../db/room-operations/get-room/getRoomsId.js";
import { isUserActive, setOffLiveRoomByUserId, setUserActive, setUserInActive } from "../../data/userio/connectedusers.js";
import { setOffLive } from "./setLive.js";




const setOnline=async (socket)=>{
   try{
     setUserActive(socket.userId,socket.id);
    socket.join(socket.userId);    // to join its id room
emitRoomTOUserOnline(socket)
   
    // to do  double tick
     
    return true;
}
catch(err){
    console.error(err);
    return false;
}
}

export default setOnline; 




export const setOffline= async(socket)=>{
 
   try{
    setUserInActive(socket.userId)
    socket.leave(socket.userId);  

 const rooms=setOffLiveRoomByUserId(socket.userId)
  rooms.forEach((roomId) => {
    setOffLive(socket,roomId)
  
});
   

await emitRoomTOUserOffline(socket);
    return true;
}
catch(err){
    console.error(err);
    return false;
}
}



export const emitRoomTOUserOnline=async(socket)=>{

const roomsIdList=await getRoomsId(socket.userId);
roomsIdList.forEach(id=>{
   if(isUserActive(id)){ socket.to(id).emit("u/chats/setRoomReceiverActive",{roomId:[socket.userId,id].sort().join("-").toString()})
}
})


}


export const emitRoomTOUserOffline=async(socket)=>{

const roomsIdList=await getRoomsId(socket.userId);
roomsIdList.forEach(id=>{
   if(isUserActive(id)) socket.to(id).emit("u/chats/setRoomReceiverInActive",{roomId:[socket.userId,id].sort().join("-").toString()})
})


}