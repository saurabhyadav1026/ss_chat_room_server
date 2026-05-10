import mongoose from "mongoose";






const schema=mongoose.Schema({
   

    info:[{
        userId:String,
        latitude:{type:String,default:null},
        longitude:{type:String,default:null},
        time:{type:Date,default:Date.now},
        geoInfo:Object
    }],
  
})

const Deviceinfo=mongoose.model("Deviceinfo",schema);
export default Deviceinfo;