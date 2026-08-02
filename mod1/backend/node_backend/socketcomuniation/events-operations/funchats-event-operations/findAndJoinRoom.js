
import  argon2 from "argon2";
import funRoom from "./room.js";
import { generateAccessToken } from "../../../security/loggin/tokens/generateToken.js";
import { time } from "node:console";



const findAndJoinRoom=(io,socket,data)=>{


  const room_=  funRoom.roomBox.get(data.roomCode);
  if(!room_){
    socket.emit("roomJoined",{status:false,message:"Envalied room code."});
return;}
const {["password"]:ps,...room}=room_;
if(room.type==="public"){
   socket.roomCode=room.roomCode;
    socket.join(room.roomCode); 
socket.to(room.roomCode).emit("roomNotify",{_id:Date.now,by:0,text:socket.id+"   join the room"});

socket.emit("roomJoined",{status:true,room})
}
else{
   socket.emit("roomJoined",{status:false,room});
   return;
}

}

export default findAndJoinRoom;


export const findAndJoinPrivateRoom=async(io,socket,data)=>{


  const room=  funRoom.roomBox.get(data.roomCode);

  if(!room || room.type!=="private" ){
    socket.emit("roomPvtJoined",{status:false,message:"Envailed room code."});
return;}
if(room.type==="private"){
    
    if(!data.password.trim()){
        socket.emit("roomPvtJoined",{status:false,message:"Password is required."});
return;
    }
 if(await argon2.verify(room.password,data.password))   {
socket.roomCode=room.roomCode;
    socket.join(data.roomCode); 
socket.to(data.roomCode).emit("roomNotify",{_id:Date.now(),by:0,text:socket.id+"   join the room",time:Date.now()});
const {["password"]:ps, ...room_}=room
socket.emit("roomPvtJoined",{status:true,room:room_})
}
else{
   socket.emit("roomPvtJoined",{status:false,message:"Incorrect Password."});
   return; 
}
}
else{
   socket.emit("roomPvtJoined",{status:false,message:"Invalid input."});
   return;
}

}