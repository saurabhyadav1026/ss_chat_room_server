import Chat_Room from "../models/chat_room_model.js"





const migrate =async(req,res)=>{

const rooms=await Chat_Room.find({});
console.log("migrate length= "+rooms.length)
for(let i=0;i<rooms.length;i++){
    console.log(rooms[i])
   const up_room =await Chat_Room.findOneAndUpdate({_id:rooms[i]._id.toString()},{$set:{_id:rooms[i].members.map((id)=>id.toString()).sort().join("-")}})
        console.log(up_room)
}
res.send("done")
}

export default migrate;