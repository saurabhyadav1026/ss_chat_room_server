import mongoose from "mongoose";





const schema = mongoose.Schema({
    roomId:{type:mongoose.Types.ObjectId,ref:"Airoom"},
    query:String,
    response:String
})

const Aimessage=mongoose.model("Aimessage",schema);
export default Aimessage;