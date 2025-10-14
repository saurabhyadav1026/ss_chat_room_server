

import { buffer } from 'stream/consumers';
import User ,{User_list}from './dbschema.js'

 const newUser=async(name, username, password, email,public_bundle,storekey)=> {
       const  user = {}

        user.public_info = {
            dp: "https://ik.imagekit.io/sbhtechhub/sspapp/no_dp.jpg?updatedAt=1757939586164",
            name: name,
            username: username,
            about: "hey! i am using SSP app.",

            public_bundle:public_bundle

        };

        user.personal_info = {
            storekey:storekey,
            password: password,
            emai: email,
            active_tokens: []
        };

        user.app_setting={};
        user.account_setting={};

        user.chats={

        };
        user.unread={}


const u_l= new User(user);
 const new_user=  new User_list({username:username,name:name})
  
  await new_user.save();
  await u_l.save();
    }


    export default newUser;




