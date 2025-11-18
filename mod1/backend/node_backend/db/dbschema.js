


const user_schema=new mongoose.Schema({
                                  
                                  socketId:[String],
                                  public_info:{
                                    username:{type:String,require:true,unique:true}
                                  },
                                  private_info:{
                                    mailId:{type:String,required:true,unique:true}
                                  },
})

const User=mongoose.model('User',user_schema);
export User;



const chat_room_schema=new mongoose.Schema({
  members:[{  memberId:{type:mongoose.Schema.Types.ObjectId, ref:"User"  ,required:true}, unreadCount: Number}],
  
last_msg:String,
room_setting:Object
})

const Chat_Room =mongoose.model('Chat_Room',chat_room_schema);
export Chat_Room;






const message_schema=new mongoose.Schema({

  roomId:{ type:mongoose.Schema.Types.ObjectId, ref:"Chat_Room" ,required:true},
  senderId:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
  text:String,
  timeStamp:{type:Date,default:Date.now},
  tick:{type:Number ,required:true},
  tickStatus:[Object],
  deleteFor:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
  beforeEdit:[{text:String,timeStamp:{type:Date,default:Date.now}}],
  attachmentFile:[String]
  
})

 const Message=mongoose.model('Message',message_schema);

export Message;





