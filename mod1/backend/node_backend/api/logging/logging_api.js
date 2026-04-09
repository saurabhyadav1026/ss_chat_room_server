
import express from 'express';
import User from '../../db/db/models/user_model.js';
import setLogged from '../../security/loggin/setlogged.js';
import argon2 from 'argon2';
import forgetPassword, { resetPassword, verifyResetPasswordLink } from '../../security/loggin/forgetPassword.js';
import googleAuthVerification from '../../security/loggin/googleAuthVerification.js';
import newUser from '../usersSection/new_user.js';

import jwt from 'jsonwebtoken'
const loggingRouter=express.Router();



loggingRouter.get('/newuser', async (req, res) => {

  const newU={
    name:req.body.name,
    username:req.body.username,
    password:await argon2.hash(req.body.password,{type:argon2.argon2id}),
    email:req.body.email.toLowerCase(),


  }

  await newUser(newU);

  res.status(200).json({username:req.body.username})
});





loggingRouter.post("/googleAuthVerification",async(req,res)=>{
 console.log("we start the authentication......")
try{
 
await googleAuthVerification(res,req.body.token)
}
catch(err){
  console.log("sbhyd  your error :---- \n")
  console.log(err);
  res.status(401).json({status:false})
}


})




loggingRouter.get('/verifyuser', async (req, res) => {
try { const u = await User.findOne({"public_info.username": req.query.username })

  if (u && await argon2.verify(u._doc.personal_info.password ,req.query.password)) {
setLogged(res,u._id)

}
  
 else res.status(200).json({staus:false})}
 catch(err){
  console.log(err);
  res.status(403).json({status:false})
 }

})


loggingRouter.get("/forgetpassword",async (req,res)=>{
    console.log("hello forget  "+ req.query.email)
try{
   
  res.status(200).send({status:await forgetPassword(req.query.email.toLowerCase())})
}
catch(err){
  console.log(err);
  res.status(399).send({status:false})
}
})


loggingRouter.get("/verifyresetpasswordlink",async(req,res)=>{
let val=false;

   console.log(req.headers.authorization)
   console.log(req.headers.authorization.split(" ")[1])
   val=await verifyResetPasswordLink(req.headers.authorization.split(" ")[1]);
   console.log(val);
res.status(200).send({status:val})

})


loggingRouter.get("/setpassword",async (req,res)=>{
  const token=req.headers.authorization.split(" ")[1];
  if(!token || !req.query.password){res.status(399).send({status:false}); return;}
  let status=true;
    try{

console.log("we will set your password")
status= await resetPassword(token,req.query.password)
   if(status) console.log("done")
    }
catch(err){
    console.log(err);
    status=false;
  
}
   
  res.status(200).send({status:status});

})


export default loggingRouter;