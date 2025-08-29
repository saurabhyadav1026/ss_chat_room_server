import mongoose from "mongoose"



const userSchema= new mongoose.Schema(
{
    username:String,
    dp:String,
    name:String,
    userpassword:String,
    contact:String, 
    chats:{ 
     },
     unread:{

     },
     isReloade:Boolean
    
    
}
)
export const User=mongoose.model('User',userSchema);

