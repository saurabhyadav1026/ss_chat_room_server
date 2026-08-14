
import Message from "../db/models/message_model.js";

import mongoose from "mongoose";





 export const sendMessage=async(senderId,roomId,text)=>{
 try {   let tempMsg={
        senderId:mongoose.Types.ObjectId(senderId),
        text:text,
        roomId:mongoose.Types.ObjectId(roomId)
    }

    const msg=(await (new Message(tempMsg)).save());

    return {status:true,msg:msg}
}
catch(err){console.log(err); return {status:false};}

}

