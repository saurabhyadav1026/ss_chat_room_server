

import mongoose from "mongoose";

const message_schema = new mongoose.Schema({

  roomId: { type:String , ref: "Chat_Room", required: true },
  senderId: { type:String, ref: "User",required:true},
text:{type:String,required:true},
   
  deleteFor: [{ type: String, ref: "User"}],
  attachmentFile: [{type:String,default:null}],
  tick:{type:Number,default:1},
  tickStatus:{send:{type:Date,default:new Date()}}

})  

 const Message = mongoose.model('Message', message_schema);

export default Message;