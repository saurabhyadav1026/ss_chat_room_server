import funRoom from "./room.js";


const sendMsg=(io,socket,data)=>{
  

    if(socket.roomCode && funRoom.roomBox.get(socket.roomCode)){
const msg=data.msg;
msg.by=2;
    socket.to(socket.roomCode).emit("receiveMsg",msg);
    return;
    }
        
        socket.emit("roomNotify",{_id:Date.now(),by:0,text:"session expired . join again the room", time:Date.now()})
  
     
 

}

export default sendMsg;