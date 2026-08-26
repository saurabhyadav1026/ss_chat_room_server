
import Message from "../db/models/message_model.js";
import User from "../db/models/user_model.js";


const limit =50;
const getMessages=async (userId,roomId,cursor)=>{

try{
  const filter={roomId};
  if(cursor)filter["_id"]={$lt:cursor};
 
const _messages=await Message.find(
    filter
).sort({_id:-1}).limit(Number(limit)+1);
if(!_messages ){
  if( !isValidateRoomId(roomId))  throw new Error("invalid room Id.");
  else _messages =[]

}


const hasMore=_messages.length>limit;
if(hasMore)_messages.pop();

_messages.reverse();

const messages={};

_messages.forEach(msg => {
messages[msg._id]=msg;    
});
const messagesIdList=Object.keys(messages);

  return  {status:true,
     data:{messages,
    messagesIdList,
    cursor:hasMore?messagesIdList[messagesIdList.length-1]._id:undefined,
    hasMore

  }
}  
}
catch(err){
    console.error(err);
    return {status:false}
}

}
export default getMessages;

export const getLastMessage= async (userId,roomId)=>{

try{ const msg= await Message.find({roomId:roomId}).sort({_id:-1}).limit(1);
if(msg.length==0)return {}
 return msg[0]
 }
 catch(err){
  console.error(err);
  return {}
 }

}



export const isValidateRoomId=async(roomId)=>{

try{const members=roomId.split("-");
  if(members.length!==2)return false;

  for (id in members){
    const u=await User.findById(id).lean();
    if(!u)return false;
  }
  return true;}
  catch(err){
    return false;
  }
}