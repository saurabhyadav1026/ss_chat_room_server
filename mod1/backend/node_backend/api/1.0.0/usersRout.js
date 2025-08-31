


import express from 'express';
import User,{ User_list } from './dbschema.js'
import getGenRes from '../controll/getGenRes.js';

import sendOtp from '../mail/sendOtp.js';
import { getChat, getsearchList, sendMsg } from './user.js';
import newUser from './new_user.js';




const usersRoute = express.Router();


usersRoute.get('/newuser', async (req, res) => {
  await newUser(req.query.name,req.query.username,req.query.password,req.query.email);

  res.json((await User_list.find({username:req.query.username})))
});





usersRoute.get('/newchat', async (req, res) => {

  const us = await User.findOne({ username: req.query.activeuser })
  const c = us.chats;
  const unread = us.unread;
  if (req.query.activechat.includes('sbhai')) c[req.query.activechat] = { name: req.query.activechat, reqs: [], ress: [] };
  else if (c[req.query.activechat]) { }      // for if already have chat with acitivechat
  else {
    c[req.query.activechat] = [];
  }
  await User.updateOne({ username: req.query.activeuser }, { $set: { chats: c, unread: unread } })
  res.json({ value: "done" })

});


usersRoute.get('/checkisusernameavailble', async (req, res) => {
  
  const temp = await isUserAvailble(req.query.username)
  res.json({ value:temp })
})

usersRoute.get('/getchatslist', async (req, res) => {
let chat_list=await  getChat(req.query.activeuser)  
       let unread_chat=await User.findOne({username:req.query.activeuser});
       unread_chat=unread_chat['unread']   
       Object.keys(unread_chat).forEach((x)=>{
     if(req.query.activeuser!==req.query.activechat&&unread_chat[x]!==0) doDoubleTick(req.query.activeuser,x);    // to double tick the msg
   
       })
  
  
  
  res.json({ value: chat_list });
});








usersRoute.get('/getname', async (req, res) => {

  const u = await getName(req.query.username)
  res.json({ value: u });

})


usersRoute.get('/getisreloade', async (req, res) => {

  const u = await User.findOne({public_info:{ username: req.query.username }})
  res.json({ value: u['isReloade'] });
})


usersRoute.get('/verifyuser', async (req, res) => {
  const u = await User.findOne({public_info:{ username: req.query.username }})
  let v = false;
  if (u && u.personal_info.userpassword === req.query.userpassword) v = true

  res.json({ value: v });

})


usersRoute.get('/getsearchlist', async (req, res) => {

  let search_list=await getsearchList(req.query.activeuser,req.query.input)
  res.json({ value: search_list })
})


usersRoute.get('/getchat', async (req, res) => {
  let chat = [];
  const user = await User.findOne({ username: req.query.activeuser })
  
  if (req.query.activechat.includes('sbhai')) {
    user['chats'][req.query.activechat.toString()]['reqs'].forEach((r, i) => {
      let rr = user['chats'][req.query.activechat]['ress'][i]
      chat.push({time:"", by: 1, text: r }, { by: 2, text: rr })

    }
    )
  }
  else{
    const user = await User.findOne({ username: req.query.activeuser })
  
    if(user['chats'][req.query.activechat]){chat =await  getChat(req.query.activeuser,req.query.activechat)
    let us_unread=user['unread']
    us_unread[req.query.activechat]=0;
    doBlueTick(req.query.activeuser,req.query.activechat);  // to do blue tick the msg
    await User.updateOne({username:req.query.activeuser},{$set:{unread:us_unread}})
  }
}
  res.json({ value: chat });

})






usersRoute.get('/sendtoai', async (req, res) => {
  const user = await User.findOne({ username: req.query.activeuser })

  const c = user['chats'];
  c[req.query.activechat]['reqs'].push(req.query.req);
  c[req.query.activechat]['ress'].push(await getGenRes(req.query.req));
  await User.updateOne({ username: req.query.activeuser }, { $set: { chats: c } })

  res.json({ value: "done" })
})

// fo genai getGenRes(req.query.req)

usersRoute.get('/sendtofriend', async (req, res) => {

let rr=await sendMsg(req.query.activeuser,req.query.activechat,req.query.text);
res.json({value:rr})
})



usersRoute.get('/reloaded', async (req, res) => {
  await User.updateOne({public_info:{ username: req.query.username }}, { $set: { isReloade: false } })
  res.json({})
})



usersRoute.get('/getotp',async(req,res)=>{

await sendOtp(req.query.email,res)

});


usersRoute.get('/getloguser',async(req,res)=>{
  let us= await User.findOne({username:req.query.username})
  res.json({value:{username:us.username,name:us.name,email:us.email}})
})

usersRoute.get('/getuser',async(req,res)=>{
  let us=await User.findOne({username:req.query.username})
  res.json({value:{username:us.username,name:us.name}})
})



export default usersRoute




const isUserAvailble = async (username) => {
  
  let value=true;
  if (username.includes('sbhai') || username === 'sbhunk')value=false;
  else {
    let users = await User_list.find();
    for (let i = 0; i < users.length; i++) {
    if (users[i].username === username ){
      value = false;
      break;
    }
  }}
  return value;
}











const doBlueTick=async(A,x)=>{

 
  let chats=await User.findOne({username:x})

  chats=chats['chats'];
  for(let i=(chats[A].length)-1;i>=0;i--){
    if(chats[A][i].by===1&&chats[A][i].status<3){
      chats[A][i].status=3;
    }
     else if(chats[A][i].by===2){}
   else break;
  }
  await User.updateOne({username:x},{$set:{chats:chats,isReloade:true}})
}



const doDoubleTick=async(A,x)=>{

  
  let chats=await User.findOne({username:x})
  chats=chats['chats'];
  for(let i=(chats[A].length)-1;i>=0;i--){
    if(chats[A][i].by===1&&chats[A][i].status<2){
      chats[A][i].status=2;
    }
    else if(chats[A][i].by===2){}
   else break;
  }
  await User.updateOne({username:x},{$set:{chats:chats,isReloade:true}})
}


