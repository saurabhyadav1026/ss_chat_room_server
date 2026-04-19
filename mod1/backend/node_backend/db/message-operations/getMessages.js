
import Message from "../db/models/message_model.js";

const getMessages=async (userId,roomId)=>{

try{
 
const messages=await Message.find(
    {roomId:roomId}
);
const messagesList={};
messages.forEach(msg => {
messagesList[msg._id]=msg;    
});
  return  messagesList|| {};  
}
catch(err){
    console.log(err);
    return {};
}

}
export default getMessages;

export const getLastMessage= async (userId,roomId)=>{

try{ const msg= await Message.find({roomId:roomId}).sort({_id:-1}).limit(1);
if(msg.length==0)return {}
 return msg[0]
 }
 catch(err){
  console.log(err);
  return {}
 }

}

