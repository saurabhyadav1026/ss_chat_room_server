


import express from 'express';
import {User} from '../../db/db/dbschema.js'

import sendOtp from '../../mail/sendOtp.js';
//import { getChat, getsearchList, getChatsList } from './user.js';
import newUser from './new_user.js';

import argon2 from 'argon2';

  
import googleAuthVerification from '../../security/loggin/googleAuthVerification.js';

import setLogged from '../../security/loggin/setlogged.js';


import tokenVerification from '../../security/loggin/tokens/tokenVerification.js'



const usersRoute = express.Router();


usersRoute.get('/newuser', async (req, res) => {

  const newU={
    name:req.body.name,
    username:req.body.username,
    password:await argon2.hash(req.body.password,{type:argon2.argon2id}),
    email:req.body.email.toLowerCase(),


  }

  await newUser(newU);

  res.status(200).json({username:req.body.username})
});




usersRoute.post("/googleAuthVerification",async(req,res)=>{
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










usersRoute.get('/checkisusernameavailble', async (req, res) => {
  
  const temp = await isUserAvailble(req.body.username)
  res.json({ value:temp })
})















usersRoute.get('/verifyuser', async (req, res) => {
try { const u = await User.findOne({"public_info.username": req.query.username })

  if (u && await argon2.verify(u._doc.personal_info.password ,req.query.password)) {
setLogged(res,u,false )

}
  
 else res.status(200).json({staus:false})}
 catch(err){
  console.log(err);
  res.status(403).json({status:false})
 }

})







usersRoute.get('/getotp',async(req,res)=>{

await sendOtp(req.query.email,res)

});






usersRoute.post('/setdp',tokenVerification ,async(req,res)=>{



  try{
let u=await User.updateOne({_id:req.user_id},{$set:{'public_info.dp':req.body.dpurl}})

res.status(200).json({status:true})
  }
  catch(e){
    console.log(e)
    res.status(400).json({status:false})
  } 
})



export default usersRoute;













