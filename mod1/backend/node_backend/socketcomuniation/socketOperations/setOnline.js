import getRoomsId from "../../db/room-operations/get-room/getRoomsId.js";
import setDoubleTick from "./setDoubleTick.js";




const setOnline=async (socket)=>{
console.log("you will connect with users and get online:   "+socket.userId)
   try{ const rooms=await getRoomsId(socket.userId);
        socket.join(socket.userId);
    rooms.forEach(room => {
        socket.join(room._id.toString());    
    });

    // to do  double tick
     setDoubleTick(socket)
     
    console.log("now you are online")
    return true;
}
catch(err){
    console.log(err);
    return false;
}
}

export default setOnline; 