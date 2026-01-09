


import express from 'express';
import {User} from '../../db/dbschema.js'
import getGenRes from '../../controll/getGenRes.js';

import sendOtp from '../../mail/sendOtp.js';
import { getChat, getsearchList, sendMsg,getName, getChatsList } from './user.js';
import newUser from './new_user.js';

import argon2 from 'argon2';




const usersRoute = express.Router();


usersRoute.get('/newuser', async (req, res) => {

  console.log(req.query)
  const newU={
    name:req.query.name,
    username:req.query.username,
    password:await argon2.hash(req.query.password,{type:argon2.argon2id}),
    email:req.query.email.toLowerCase(),


  }

  await newUser(newU);

  res.json({username:req.query.username})
});


usersRoute.get('/getname',async(req,res)=>{
let name= await getName(req.query.username);
res.json({value:name})

})




usersRoute.get('/newchat', async (req, res) => {

 
  res.json({ value: "done" })

});


usersRoute.get('/checkisusernameavailble', async (req, res) => {
  
  const temp = await isUserAvailble(req.query.username)
  res.json({ value:temp })
})

usersRoute.get('/getchatslist', async (req, res) => {
let chat_list=await  getChatsList(req.query.activeuser)  
  res.json({ value: chat_list });
});









usersRoute.get('/getname', async (req, res) => {

  const u = await getName(req.query.username)
  res.json({ value: u });

})





usersRoute.get('/verifyuser', async (req, res) => {
  const u = await User.findOne({"public_info.username": req.query.username })
  let val = false;
  if (u && await argon2.verify(u._doc.personal_info.password ,req.query.password)) val = true

  console.log("you will loggin soon");

  const user={
    _id:u._id,
    name:u.public_info.name,
    username:u.public_info.username,
    dp:u.public_info.dp,
    about:u.public_info.about
  }
  console.log(user)
  res.json({status:val, value:user});

})


usersRoute.get('/getsearchlist', async (req, res) => {
  let search_list=[];
if(req.query.input==""){search_list= await getChatsList(req.query.activeuser)
}
  else search_list=await getsearchList(req.query.input)
  res.json({ value: search_list })
})


usersRoute.get('/getchat', async (req, res) => {
  
    let chat =await  getChat(req.query.activeuser,req.query.activechat)
  res.json({ value: chat });

})




usersRoute.get("/test/",async (req,res)=>{

 let x=  await argon2.hash("d121")
res.json(x)
})

/*
usersRoute.get("/testt/",async (req,res)=>{

 let x=  await argon2.verify("",req.query.ps)
res.json(x)
})
 */



usersRoute.get('/sendtoai', async (req, res) => {
 console.log("sending to ai")
  const user = await User.findOne({'public_info.username': req.query.activeuser })
if(!user['chats'])user['chats']={}
  const c = user['chats'];
  if(!c[req.query.activechat])c[req.query.activechat]={name:req.query.activechat,reqs:[],ress:[]}
  c[req.query.activechat]['reqs'].push(req.query.req);
  
  c[req.query.activechat]['ress'].push(await getGenRes(req.query.req));
  await User.updateOne({'public_info.username': req.query.activeuser }, { $set: { chats: c } })

  //doreloade();

  res.json({ value: "done" })
})

// fo genai getGenRes(req.query.req)






usersRoute.get('/getotp',async(req,res)=>{

await sendOtp(req.query.email,res)

});


usersRoute.get('/getloguser',async(req,res)=>{
  let us_info=await User.findOne({public_info:{username:req.query.username}})
  res.json({value:us_info})
})

usersRoute.get('/getuser',async(req,res)=>{
  let us_info=await User.findOne({public_info:{username:req.query.username}})
  res.json({value:us_info})
})



usersRoute.post('/setdp',async(req,res)=>{
  try{
await User.updateOne({'public_info.username':req.body.username},{$set:{'public_info.dp':req.body.dpurl}})
res.json({value:true})
  }
  catch(e){
    res.json({value:false})
  } 
})



usersRoute.get('/deletemsg',async(req,res)=>{
  



  res.json({value:'done'})
})


/* usersRoute.get("/chageSchema",async(req,res)=>{
  const x= await User.find({
  "personal_info.emai": { $exists: true }
})
await User.updateMany(  { "personal_info.emai": { $exists: true } },
  { $rename: { "personal_info.emai": "personal_info.email" } },
  { strict: false }   // 🔥 THIS FIXES IT)
)
res.json({})

})
 */

export default usersRoute




const isUserAvailble = async (username) => {
  
  let value=true;

    let users = await User.find({ "public_info.username": username  },{_id:1});
    console.log(users)
    if(users.length>0)value=false;
  return value;
}














