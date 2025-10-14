



import mongoose from "mongoose";



const U_schema=mongoose.Schema({

public_info:Object,
personal_info:Object,
app_setting:Object,
account_setting:Object,
chats:Object,
unread:Object





})


const User_= mongoose.model("User",U_schema);
export default User_;




// for adding in users list

 const u_list_schema=mongoose.Schema({
username:String,
name:String
})

export const User_list=mongoose.model('User_list',u_list_schema)


const app_schema=mongoose.Schema({
    
    type:String,
    data:Object
})



export const app_data=mongoose.model('app_data',app_schema)
