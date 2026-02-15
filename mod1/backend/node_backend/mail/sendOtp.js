
import sender from './sender.js'
import dotenv from 'dotenv'
import { User } from '../db/db/dbschema.js'

dotenv.config()

const sendOtp=async(user_mail,res)=>{

 const  checkuniqEmail=await User.find({"personal_info.email":user_mail.toLowerCase()}).collation({locale:'en',strength:2})

  if(checkuniqEmail.length>0){
    res.json({otp_code:null,otp:null,status:' account email id already exist'});
    return;
  }
 

  
    const OTP=createOTP();
    const otp_code=createOtpCode();

const otp_mail={

    from:process.env.MAIL_USER,
    to:user_mail,
    subject:"OTP VERIFICATION from SbhTechHub",
    html:"<h5> Your otp of code :<b> "+otp_code+"</b>   is: </h5><h1>  "+OTP+"</h1> </br></br> <h4>Thankyou</h4> "

}
console.log("we are sending mail")
 sender.sendMail(otp_mail,(err,info)=>{
    if(err){
        res.json({otp_code:null,otp:null,status:'Error! try again later.',err:err})
    }
       else{
 res.json({otp_code:otp_code,otp:OTP,status:'ok'})
    }
})

}


export default sendOtp;







const createOtpCode=()=>{
 let otp_code=Math.floor(Math.random()*99999);
    return otp_code;
}

const createOTP=()=>{
    let otp=Math.floor(Math.random()*999999);
    return otp;
}