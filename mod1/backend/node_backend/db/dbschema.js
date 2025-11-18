


const user_schema=mongoose.Schema({
                                  
                                  socketId:[String];
                                  public_info:Object,
                                  private_info:Object,
})

const User=mongosse.model('User',user_schema);
export User;



const chat_room_schema=mongoose.Schema({
  members:[ {type:mongoose.Schema.Type.ObjectId, ref:User  ,required:true}]
last_msg:String,
room_setting:Object
})

const Chat_Room =mongoose.model('Chat_Room',chat_rooom_schema);
export Chat_room;






const message_schema=mongoose.model({

  roomId:{ type:mongoose.Schema.Types.ObjectId, ref: Chat_room ,required:true},
  senderId:{type:mongoose.Schema.Types.ObjectId, ref:User,required:true},
  text:String,
  timeStamp:{type:Date,default:Date.now},
  tick:{type:Number ,required:true},
  tickStatus:[Object]
  deleteFor:[{type:mongoose.Schema.Types.ObjectId, ref:User}],
  beforeEdit:[{text:String,timeStamp:{type:Date,default:Date.now}}],
  attachmentFile:[String]
  
})

export const Message=mongoose.model('Message',message_schema)




