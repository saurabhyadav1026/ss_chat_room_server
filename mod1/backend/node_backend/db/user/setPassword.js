import argon2 from 'argon2';
import User from "../db/models/user_model.js";



const setPassword=async(userId,password)=>{

   let status=true;


try{
   
   await User.updateOne({_id:userId},{$set:{"personal_info.password":await argon2.hash(password,{type:argon2.argon2id})}},{new:true});


  
}catch(err){
    console.log(err);
    status=false;
}

    return status;


}

export default setPassword;