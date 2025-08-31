



import mongoose from "mongoose";



const U_schema=mongoose.Schema({

public_info:{},
personal_info:{},
app_setting:{},
account_setting:{},
is_reloade:Boolean,
chats:{},
unread:{}





})


const User_= mongoose.model("User",U_schema);
export default User_;




// for adding in users list

 const u_list_schema=mongoose.Schema({
username:String,
name:String
})

export const User_list=mongoose.model('User_list',u_list_schema)







