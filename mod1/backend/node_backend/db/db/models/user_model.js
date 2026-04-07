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




 const User = mongoose.model('User', user_schema);
 
 export default User;
