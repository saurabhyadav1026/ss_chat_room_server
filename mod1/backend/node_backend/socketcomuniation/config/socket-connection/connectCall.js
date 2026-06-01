




const connectCall=async(callIO)=>{

callIO.on("connection" ,(socket)=>{




socket.on("joinroom",({roomId})=>{
    socket.join(roomId);
  
    socket.emit("roomjoined",{roomId:roomId})
})

socket.on("offer",({roomId,offer})=>{
   
    socket.to(roomId).emit("offer",{offer:offer});
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