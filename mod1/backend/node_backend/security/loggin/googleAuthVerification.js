

import { OAuth2Client } from 'google-auth-library';
import { User } from '../../db/db/dbschema.js';
import setLogged from './setlogged.js';



const client=new OAuth2Client(process.env.GOOGLE_O_AUTH_CLINT_ID);
const googleAuthVerification=async(res,token)=>{

  const ticket= await client.verifyIdToken({idToken:token,audience:process.env.GOOGLE_O_AUTH_CLINT_ID});
    const payloade=ticket.getPayload();
    
    
    
    
     let u= await User.findOne({"personal_info.email":payloade.email.toLowerCase()},{public_info:1})
    let isNewUser=false;
    if(!u){
    
      isNewUser=true;
    const us={
      public_info:{
        name:payloade.name,
        username:await createUsername(payloade.given_name+payloade.family_name),
        dp:payloade.picture
      },
      personal_info:{
    email:payloade.email.toLowerCase()
      }
    }
    const x= new User(us)
    await x.save();
    u= await User.findOne({"personal_info.email":payloade.email},{public_info:1})
    }
   setLogged(res,u,isNewUser)

  
     
    return ;
}

export default googleAuthVerification;





const createUsername=async(name)=>{

  let username=name;
  while(!(await isUserAvailble(name))){
username=name+Math.floor(Math.random()*10000)

  }
return username;
}



const isUserAvailble = async (username) => {
  
  let value=true;

    let users = await User.find({ "public_info.username": username  },{_id:1});
 
    if(users.length>0)value=false;
  return value;
}
