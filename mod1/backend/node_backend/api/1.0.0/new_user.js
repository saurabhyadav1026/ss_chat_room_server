

import { buffer } from 'stream/consumers';
import {User} from '../../db/db/dbschema.js'

 const newUser=async({name,username,password,email})=> {
       
  const  user = {
           public_info :{
            name: name,
            username: username,
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




