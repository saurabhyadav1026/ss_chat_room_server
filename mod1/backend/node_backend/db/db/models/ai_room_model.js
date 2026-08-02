import mongoose from "mongoose";




const schema=mongoose.Schema({
    name:String,
    userId:{type:mongoose.Types.ObjectId,ref:"User"}
});

const Airoom= mongoose.model("Airoom", schema)

export default Airoom