
import mongoose from 'mongoose'

const user_schema = new mongoose.Schema({

  socketId: [String],
  public_info: {
    username: { type: String, require: true, unique: true, sparse:true },
    name:String,
    about:{type:String, default:"Hey! I am not bussy for you."},
    dp:{type:String,default:"https://ik.imagekit.io/sbhtechhub/no_dp.jpg"},
 _id:false
  },
  personal_info: {
    email: { type: String, required: true, unique: true },
    password: { type: String, sparse:true ,default:null },
    _id:false,
  },
})




export const User = mongoose.model('User', user_schema);


 // schema for chat room 

const chat_room_schema = new mongoose.Schema({

  roomType:{type:String,default:"personal_chat"},
  members: [{ type: String, ref: "User" }],
  roomName:String,
   roomSetting: Object
})

export const Chat_Room = mongoose.model('Chat_Room', chat_room_schema);







const message_schema = new mongoose.Schema({

  roomId: { type: String, ref: "Chat_Room", required: true },
  senderId: { type: String, ref: "User"},
texts:[{memberId:String,text:String}],
  tick: { type: Number,default:1, required: true },
  tickStatus: {send:{ type: Date, default: Date.now },delivered:{ type: Date, default: null },read:{ type: Date, default:null }},
   beforeEdit: [{ text: String, timeStamp: { type: Date, default: Date.now } }],   
  deleteFor: [{ type: String, ref: "User"}],
  attachmentFile: [{type:String,default:null}]

})

export const Message = mongoose.model('Message', message_schema);







