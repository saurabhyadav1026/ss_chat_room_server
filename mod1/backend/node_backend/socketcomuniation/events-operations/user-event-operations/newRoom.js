import newRoomId from "../../../db/room-operations/add-room/newRoom.js";



const socketOperationNewRoom=async(io,socket,receiverId)=>{

try{
       const roomId=await newRoomId(socket.userId,receiverId);

  
   // const receiverSocketId=io.sockets.adapter.rooms.get(receiverId);            // to get receiver socket Id
     const receiverSocket=await io.in(receiverId).fetchSockets();               //io.sockets.sockets.get(receiverSocketId);           // to get receiver socket by receiver socket Id
    
    if(receiverSocket[0]){
        receiverSocket[0].join(roomId)            // to add receiver with room
          
} 
socket.join(roomId);      // to join sender with room



        return {status:true,roomId:roomId};
}catch(err){
    console.log(err);
    return {status:false};
}

}

export default socketOperationNewRoom;