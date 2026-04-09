

//import { buffer } from 'stream/consumers';
import  User from '../../db/db/models/user_model.js'

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

  await ( new User(user)).save();

 

    }


    export default newUser;




