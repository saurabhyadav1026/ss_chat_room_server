
import express from 'express';
import User from '../../db/db/models/user_model.js';
import setLogged from '../../security/loggin/setlogged.js';
import argon2 from 'argon2';
import forgetPassword, { resetPassword, verifyResetPasswordLink } from '../../security/loggin/forgetPassword.js';
import googleAuthVerification from '../../security/loggin/googleAuthVerification.js';
import newUser from '../usersSection/new_user.js';
import sendOtp, { createOtpCode } from '../../mail/sendOtp.js';
import { generateOTPToken } from '../../security/loggin/tokens/generateToken.js';
const loggingRouter = express.Router();


loggingRouter.post('/newuser', async (req, res) => {

  if (!req.cookies.registerOTPToken) {
    res.status(401).json({ status: false, message: "No request for otp. For registering ,first request for otp." });
    return
  }

  return jwt.verify(token, process.env.OTP_TOKEN_SECRET, async(error, decoded) => {

    if (error) {
      res.status(401).json({ status: false, message: error.message });
      return;
    }
    if(decoded.payload.otp!==req.body.otp.trim()  && decoded.payload.email.trim().toLowerCase()!==req.body.email.trim().toLowerCase()){
      res.status(422).json({ status: false, message: "Incorrect OTP or email not match." });
      return;
    }

   try{ const newU = {
      name: req.body.name,
      username: req.body.username,
      password: await argon2.hash(req.body.password, { type: argon2.argon2id }),
      email: req.body.email.toLowerCase(),


    }

    await newUser(newU);

    res.status(200).json({ status: true })
  }catch(error){
    res.status(500).send({status:false,message:"Error!, Try again later."})
  }
  })
});



loggingRouter.get("/isuseravailble", async (req, res) => {
  try {
    const val = await User.find({ "public_info.username": req.query.username });
    res.json({ status: !val.length > 0 });
  } catch (err) {
    console.error(err);
    res.json({ status: false })
  }

})


loggingRouter.post("/googleAuthVerification", async (req, res) => {


  res.status(200).send(await googleAuthVerification(res, req.body.token))
})




loggingRouter.get('/verifyuser', async (req, res) => {
  console.log("hii")

  try {
    const u = await User.findOne({ "public_info.username": req.query.username })

    if (u && await argon2.verify(u._doc.personal_info.password, req.query.password)) {  // checksbhbug
      console.log("good")
      res.status(200).send({ status: setLogged(res, u._id) })

    }

    else {

      res.status(200).json({ staus: false })
    }
  }
  catch (err) {
    console.error(err);

    res.status(403).json({ status: false })
  }

})


loggingRouter.get("/forgetpassword", async (req, res) => {
  try {

    res.status(200).send({ status: await forgetPassword(req.query.email.toLowerCase()) })
  }
  catch (err) {
    console.error(err);
    res.status(399).send({ status: false })
  }
})


loggingRouter.get("/verifyresetpasswordlink", async (req, res) => {
  let val = false;

  val = await verifyResetPasswordLink(req.headers.authorization.split(" ")[1]);
  res.status(200).send({ status: val })

})


loggingRouter.get("/setpassword", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token || !req.query.password) { res.status(399).send({ status: false }); return; }
  let status = true;
  try {

    status = await resetPassword(token, req.query.password)
  }
  catch (err) {
    console.error(err);
    status = false;

  }

  res.status(200).send({ status: status });

})


loggingRouter.get('/getotp', async (req, res) => {

  try{
     const otp_code=createOtpCode();

     const otp_token=generateOTPToken({otp:otp_code,email:req.query.email});

       res.cookie("registerOTPToken",otp_token,
    {httpOnly:true,
      sameSite:"None",
      secure:true,
      maxAge:5*60*1000,
    })

   const  response=await sendOtp(req.query.email, otp_code);
   if(response.status){
    res.status(200).send({status:true});

   }
else{
  res.status(422).send({status:false,message:response.message})
  }
  }
  catch(err){
    console.error(err)
    res.status(500).send({status:false,message:err.message})
  }

  });

export default loggingRouter;