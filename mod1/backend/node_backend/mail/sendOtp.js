
import sender from './sender.js'
import dotenv from 'dotenv'
import  User  from '../db/db/models/user_model.js'
import resend from './sender.js'

dotenv.config()

const sendOtp=async(user_mail,OTP)=>{

 const  checkuniqEmail=await User.find({"personal_info.email":user_mail.toLowerCase()}).collation({locale:'en',strength:2})

  if(checkuniqEmail.length>0){
    return {status:false,message:' account email id already exist'};
  }
 


const otp_mail={

    from:"Matrices <noreply@sbhtechhub.matrices.me>",
    to:user_mail,
    subject:"OTP VERIFICATION from SbhTechHub",
    html:"<h5> Your otp of code :<b> "+otp_code+"</b>   is: </h5><h1>  "+OTP+"</h1> </br></br> <h4>Thankyou</h4> "

}

/*  return  await sender.sendMail(otp_mail,async(err,info)=>{
    if(err){
       return{status:false,message:"Check your email address or try again later."}}
       else{
 return {status:true}
    }
})
 */
/* 
return new Promise((resolve) => {
    sender.sendMail(otp_mail, (err, info) => {
        if (err) {
            resolve({ status: false, message: "Check your email address or try again later." });
        } else {
            resolve({ status: true });
        }
    });
}); */




return new Promise(async (resolve) => {
  try {
    await resend.emails.send(otp_mail);

    resolve({ status: true });
  } catch (err) {
    console.error(err);
    resolve({
      status: false,
      message: "Check your email address or try again later.",
    });
  }
});
}


export default sendOtp;







 export  const createOtpCode=()=>{
 let otp_code=Math.floor(Math.random()*99999);
    return otp_code;
}
