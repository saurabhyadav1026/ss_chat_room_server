import getReceiverByRoomId from "../../../db/user/getReceiverByRoomId.js";





const connectCall=(callIO)=>{

callIO.on("connection" ,(socket)=>{






socket.on("startcall",async({roomId,offer})=>{

    console.log("offer hai")
    console.log(offer)
    const activeCall={
        ...( await getReceiverByRoomId(socket.userId,roomId)),
        roomId
    }
   
    socket.to(roomId).emit("incomingcall",{activeCall,offer});
    })


socket.on("answer",({roomId,answer})=>{
     
    socket.to(roomId).emit("answer",{answer:answer});
    })

socket.on("ice-candidate",({roomId,candidate})=>{
      console.log("we gewt ice candidate  "+socket.id)
    socket.to(roomId).emit("ice-candidate",{candidate:candidate});
    })


socket.on("end-call",({roomId})=>{
    socket.to(roomId).emit("end-call");
    })




socket.on("disconnect",()=>{
    console.log("funchat user disconnected")
})

}

);
}

export default connectCall;