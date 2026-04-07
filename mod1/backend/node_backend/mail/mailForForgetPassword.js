import { userInfo } from "node:os";
import sender from "./sender.js";

import jwt from 'jsonwebtoken'


const mailFOrForgetpassword=async(userId,userInfo,emailId)=>{
let status=true;

    sender.sendMail(mail(userId,userInfo,emailId),(err,info)=>{
        if(err){
            console.log(err);
            status=false;
        }
    })
    return status;
}

export default mailFOrForgetpassword;


const mail=(token,user_ifo,emailId)=>{

    

return {

    from:process.env.MAIL_USER,
    to:emailId,
    subject:"Forget Password :    SSAPP",
    html:`<div>
    
    <h2>Hello! ${user_ifo.name}</h2>
    <pre>
    You have reqested to forget password for <b> SSAPP account of username <b>${user_ifo.username}</b></b> 
    </pre>
<p> For reset your password click :- <p>

  <a href=${passwordResetLink(token)} style="padding:10px; background:#4285F4; color:white; text-decoration:none; border-radius:5px;">Froget Password </a>
    
  <p>The link will expire within 5 minute. </p>
  <h5>If you not requested then click here:-</h5>

   <a  style="padding:10px; background:#4285F4; color:white; text-decoration:none; border-radius:5px;">Stop It </a>
 
    
    </div>
    `




    
}


}

const passwordResetLink=(token)=>{

let link=process.env.APP_LINK+"/resetpassword/"+token;

return link;

}

const stopPasswordResetLink=(userId)=>{
    let link=process.env.APP_LINK;
    return link;
}