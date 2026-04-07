

import mongoose from "mongoose";

const message_schema = new mongoose.Schema({

  roomId: { type:String , ref: "Chat_Room", required: true },
  senderId: { type:String, ref: "User",required:true},
texts:[{memberId:String,text:String}],
   beforeEdit: [{ text: String, timeStamp: { type: Date, default: Date.now } }],   
  deleteFor: [{ type: String, ref: "User"}],
  attachmentFile: [{type:String,default:null}]

})  

 const Message = mongoose.model('Message', message_schema);

export default Message;