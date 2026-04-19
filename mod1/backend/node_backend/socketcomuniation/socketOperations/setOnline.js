import getRoomsId from "../../db/room-operations/get-room/getRoomsId.js";
import setDoubleTick from "./setDoubleTick.js";




const setOnline=async (socket)=>{
   try{ const rooms=await getRoomsId(socket.userId);
        socket.join(socket.userId);
    rooms.forEach(room => {
        socket.join(room._id.toString());    
    });

    // to do  double tick
     setDoubleTick(socket)
    return true;
}
catch(err){
    console.log(err);
    return false;
}
}

export default setOnline; 