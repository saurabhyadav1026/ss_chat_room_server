

import { buffer } from 'stream/consumers';
import {User} from '../../db/dbschema.js'

 const newUser=async({name,username,password,email})=> {
       
  const  user = {
           public_info :{
            dp: "https://ik.imagekit.io/sbhtechhub/sspapp/no_dp.jpg?updatedAt=1757939586164",
            name: name,
            username: username,
            about: "hey! i am using SSP app.",


        },

          personal_info :{
            password: password,
            email: email.toLowerCase(),
           
        }
      };

const u_l= new User(user);

  await u_l.save();

  console.log("new user is addeddd nbro ......")
    }


    export default newUser;




