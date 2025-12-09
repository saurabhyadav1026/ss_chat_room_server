

import { buffer } from 'stream/consumers';
import {User} from '../../db/dbschema.js'

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

const u_l= new User(user);

  await u_l.save();
    }


    export default newUser;




