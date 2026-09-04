

import { OAuth2Client } from 'google-auth-library';
import  User  from '../../db/db/models/user_model.js';
import setLogged from './setlogged.js';
import { uploadeDPByImageUrl } from '../../multer/config.js';



const client=new OAuth2Client(process.env.GOOGLE_O_AUTH_CLINT_ID);
const googleAuthVerification=async(res,token)=>{

  const ticket= await client.verifyIdToken({idToken:token,audience:process.env.GOOGLE_O_AUTH_CLINT_ID});
  if(!ticket)return {status:false,msg:"ticket not verified"}
    const payload=ticket.getPayload();
    
    
    
    
     let u= await User.findOne({"personal_info.email":payload.email.toLowerCase()},{public_info:1})
    
    if(!u){
    
    const us={
      public_info:{
        name:payload.name,
        username:await createUsername(payload.given_name+payload.family_name),
        dp:null
      },
      personal_info:{
    email:payload.email.toLowerCase()
      }
    }
  u= await (new User(us)).save();
    }

    if(!u.public_info.dp)u.public_info.dp=await uploadeDPByImageUrl(u._id.toString(),payload.picture);

    await u.save();
    
   return setLogged(res,u._id)

  
}

export default googleAuthVerification;





const createUsername=async(name)=>{

  let username=name;
  while(!(await isUserAvailble(username))){
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
