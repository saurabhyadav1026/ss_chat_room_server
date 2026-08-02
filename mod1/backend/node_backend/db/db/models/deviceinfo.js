import mongoose from "mongoose";






const schema=mongoose.Schema({
   

    info:[{
        userId:{type:mongoose.Types.ObjectId,ref:"User"},
        latitude:{type:String,default:null},
        longitude:{type:String,default:null},
        time:{type:Date,default:Date.now},
        ip:String,
        device:String
    }],
  
})

const Deviceinfo=mongoose.model("Deviceinfo",schema);
export default Deviceinfo;