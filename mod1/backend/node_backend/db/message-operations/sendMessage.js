
import Message from "../db/models/message_model.js";







 export const sendMessage=async(senderId,roomId,text)=>{
console.log(text)
 try {   let tempMsg={
        senderId:senderId,
        text:text,
        roomId:roomId
    }

    const msg=(await (new Message(tempMsg)).save());

    return {status:true,msg:msg}
}
catch(err){console.log(err); return {status:false};}

}

