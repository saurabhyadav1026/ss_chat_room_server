
import Message from "../db/models/message_model.js";

import mongoose from "mongoose";





 export const sendMessage=async(senderId,roomId,text)=>{
 try {   let tempMsg={
        senderId:new mongoose.Types.ObjectId(senderId),
        text:text,
        roomId
    }

    const msg=(await (new Message(tempMsg)).save());

    return msg
}
catch(err){
    console.error(err); 
    return null

}

}

