
import Message from "../db/models/message_model.js";

import mongoose from "mongoose";

/*
data={
rooid,
senderId
texts
}


texts=[{memberId: " ", text: " "}]



*/

const addMsg=async(data)=>{
   
    let status=true;

let id=null;
try{
const {roomId,senderId,texts}=data;

 

const nmsg={
    roomId:roomId,
   senderId:senderId,
   texts:texts,
   
}

const {_id}=await new Message(nmsg).save();

id= _id;
}
catch(err){
    console.log(err)
    status=false;
}
   
return id;

}


export default addMsg;