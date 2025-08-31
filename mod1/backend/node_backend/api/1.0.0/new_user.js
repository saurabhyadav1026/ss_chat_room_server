

import User ,{User_list}from './dbschema.js'

 const newUser=async(name, username, password, email)=> {
       const  user = {}

        user.public_info = {
            dp: "",
            name: name,
            username: username,
            about: ""

        };

        user.personal_info = {
            password: password,
            emai: email,
            active_tokens: []
        };

        user.app_setting={};
        user.account_setting={};

        user.chats={

        };
        user.unread={}

        user.is_reloade=false;

const u_l= new User(user);
 const new_user=  new User_list({username:username,name:name})
  
  await new_user.save();
  await u_l.save();
    }


    export default newUser;




