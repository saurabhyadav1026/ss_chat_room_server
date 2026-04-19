import User from "../../db/db/models/user_model.js";
import setPassword from "../../db/user/setPassword.js";
import mailFOrForgetpassword from "../../mail/mailForForgetPassword.js";
import jwt from 'jsonwebtoken'



const forgetPassword=async(email)=>{

try{
    const {_id,public_info}= await User.findOne({"personal_info.email":email});
    if(_id){
        const token =jwt.sign(
          {payloade:{_id:_id}},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"5d"}
    )
         return   await mailFOrForgetpassword(token,public_info,email);
        
    }


    return false;
}catch(err){
    return false;
}


}

export default forgetPassword;



export const verifyResetPasswordLink=async (token)=>{
    if(!token)return false;
let status=true;
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
     
        if(err){ console.log(err);status= false}
    })
return status;
}



export  const resetPassword=async(token,password)=>{

   let status=true;
 jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async(err,decoded)=>{
        if(err){console.log(err);return false;}
        else {
         if(decoded.payloade._id) status=await setPassword(decoded.payloade._id,password);
          
            }
    })

 
    return status;


}