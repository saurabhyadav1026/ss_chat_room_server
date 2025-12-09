



import mongoose from "mongoose";






const app_schema=mongoose.Schema({
    
    type:String,
    data:Object
})



export const app_data=mongoose.model('app_data',app_schema)
