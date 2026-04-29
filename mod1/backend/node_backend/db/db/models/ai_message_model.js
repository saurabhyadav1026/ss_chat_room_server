import mongoose from "mongoose";





const schema = mongoose.Schema({
    roomId:String,
    query:String,
    response:String
})

const Aimessage=mongoose.model("Aimessage",schema);
export default Aimessage;