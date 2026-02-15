


import express from 'express';
import {User} from '../../db/db/dbschema.js'

import sendOtp from '../../mail/sendOtp.js';
import { getChat, getsearchList, getChatsList } from './user.js';
import newUser from './new_user.js';

import argon2 from 'argon2';


import auth from '../../security/loggin/systemTokenAuth.js';
import googleAuthVerification from '../../security/loggin/googleAuthVerification.js';

import setLogged from '../../security/loggin/setlogged.js';



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

try{
await googleAuthVerification(res,req.body.token)
}
catch(err){
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
setLogged(res,u)

}
  
 else res.status(200).json({staus:false})}
 catch(err){
  console.log(err);
  res.status(401).json({status:false})
 }

})







usersRoute.get('/getotp',async(req,res)=>{

await sendOtp(req.query.email,res)

});






usersRoute.post('/setdp',auth,async(req,res)=>{

  try{
let u=await User.findOneAndUpdate({_id:req.body._id},{$set:{'public_info.dp':req.body.dpurl}})
const user={
    _id:u._id,
    name:u.public_info.name,
    username:u.public_info.username,
    dp:req.body.dpurl,
    about:u.public_info.about
  }
 
res.json({status:true,data:user})
  }
  catch(e){
    console.log(e)
    res.json({status:false})
  } 
})



export default usersRoute;


const isUserAvailble = async (username) => {
  
  let value=true;

    let users = await User.find({ "public_info.username": username  },{_id:1});
 
    if(users.length>0)value=false;
  return value;
}





const createUsername=async(name)=>{

  let username=name;
  while(!(await isUserAvailble(name))){
username=name+Math.floor(Math.random()*10000)

  }
return username;
}








