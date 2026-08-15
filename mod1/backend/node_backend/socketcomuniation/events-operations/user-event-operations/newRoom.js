import newRoomId from "../../../db/room-operations/add-room/newRoom.js";



const socketOperationNewRoom=async(io,socket,receiverId)=>{

try{
       const roomId=await newRoomId(socket.userId,receiverId);

  
  
        return {status:true,roomId:roomId};
}catch(err){
    console.error(err);
    return {status:false};
}

}

export default socketOperationNewRoom;