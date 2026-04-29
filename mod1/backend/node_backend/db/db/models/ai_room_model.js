import mongoose from "mongoose";




const schema=mongoose.Schema({
    name:String,
    userId:String
});

const Airoom= mongoose.model("Airoom", schema)

export default Airoom