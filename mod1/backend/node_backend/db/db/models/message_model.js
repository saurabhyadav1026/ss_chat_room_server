

import mongoose from "mongoose";

const message_schema = new mongoose.Schema({

  roomId: { type:String, ref: "Chat_Room", required: true },
  senderId: { type:mongoose.Types.ObjectId, ref: "User",required:true},
text:{type:String,required:true},
   
  deleteFor: [{ type: mongoose.Types.ObjectId, ref: "User"}],
  attachmentFile: [{type:String,default:null}],
})  

 const Message = mongoose.model('Message', message_schema);

export default Message;