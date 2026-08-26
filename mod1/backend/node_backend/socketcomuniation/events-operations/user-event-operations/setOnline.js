



const setOnline=async (socket)=>{
   try{
    
    socket.join(socket.userId);    // to join its id room

   
    // to do  double tick
     
    return true;
}
catch(err){
    console.error(err);
    return false;
}
}

export default setOnline; 


import getRoomsId from "../../../db/room-operations/get-room/getRoomsId.js";





export const setOffline=async (socket)=>{
   try{
    
    socket.leave(socket.userId);    // to join its id room

   
    // to do  double tick
     
    return true;
}
catch(err){
    console.error(err);
    return false;
}
}
