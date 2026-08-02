import getRoomsId from "../../../db/room-operations/get-room/getRoomsId.js";





const setOnline=async (socket)=>{
   try{
    
    socket.join(socket.userId);    // to join its id room

    const rooms=await getRoomsId(socket.userId);            // get all connected chat room
    
    rooms.forEach(room => {
        socket.join(room._id.toString());                   //           join with chat room
    });

    // to do  double tick
     
    return true;
}
catch(err){
    console.log(err);
    return false;
}
}

export default setOnline; 