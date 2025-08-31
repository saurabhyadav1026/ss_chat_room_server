


import express from 'express';
import { User } from './dbschema.js'
//import getGenRes from '../../controll/getGenRes.js';

import sendOtp from '../../mail/sendOtp.js';




const usersRoute = express.Router();


usersRoute.post('/newuser', async (req, res) => {
  const new_user = new User(req.body);
  await new_user.save();
  res.json({ value: "done" })
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
  const us = await User.findOne({ username: req.query.activeuser });
  const chats = Object.keys(us['chats']);
  let chat_list = [];
  for (let i = 0; i < chats.length; i++) {

    if (chats[i].includes('sbhai')) chat_list.push({ username: chats[i],dp:'sbhunk', name: us['chats'][chats[i]].name, unread: 0 })
    else {
      let name = await getName(chats[i])
      chat_list.push({ username: chats[i], dp:us.dp, name: name, unread: us['unread'][chats[i]] })
   
       let unread_chat=await User.findOne({username:req.query.activeuser});
       unread_chat=unread_chat['unread']   
       Object.keys(unread_chat).forEach((x)=>{
     if(req.query.activeuser!==req.query.activechat&&unread_chat[x]!==0) doDoubleTick(req.query.activeuser,x);    // to double tick the msg
   
       })
  
  }
  }
  res.json({ value: chat_list });
});




const getName = async (username) => {
  const u = await User.findOne({ username: username })
  return u['name'];
}




usersRoute.get('/getname', async (req, res) => {

  const u = await getName(req.query.username)
  res.json({ value: u });

})


usersRoute.get('/getisreloade', async (req, res) => {

  const u = await User.findOne({ username: req.query.username })
  res.json({ value: u['isReloade'] });
})


usersRoute.get('/verifyuser', async (req, res) => {
  const u = await User.findOne({ username: req.query.username })
  let v = false;
  if (u && u['userpassword'] === req.query.userpassword) v = true

  res.json({ value: v });

})


usersRoute.get('/getsearchlist', async (req, res) => {

  const users = await User.find();
  let friends = [];
  let j = 1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username.includes(req.query.input)||users[i].name.includes(req.query.input)) {
      friends.push({ username: users[i].username, dp:users[i].dp, name: users[i].name,unread:0 })
      j++;
      if (j === 5) break;
    }
  }

  res.json({ value: friends })
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
  else if(user['chats'][req.query.activechat]){chat = user['chats'][req.query.activechat]
    let us_unread=user['unread']
    us_unread[req.query.activechat]=0;
    doBlueTick(req.query.activeuser,req.query.activechat);  // to do blue tick the msg
    await User.updateOne({username:req.query.activeuser},{$set:{unread:us_unread}})
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

  const user1 = await User.findOne({ username: req.query.activeuser })
  let c1 = user1['chats'];
  if(c1[req.query.activechat])c1[req.query.activechat].push({ time:getTime(), by: 1, text: req.query.text, status: 1 });
 else c1[req.query.activechat]=[{ time: getTime(), by: 1, text: req.query.text, status:1 }];

 
  await User.updateOne({ username: req.query.activeuser }, { $set: { chats: c1 } })
  
  // if it is not a self msg
  if (!(req.query.activeuser === req.query.activechat)) {
    const user2 = await User.findOne({ username: req.query.activechat })
    let c2 = user2['chats'];
    if (!user2['chats'][req.query.activeuser]) c2[req.query.activeuser] = [{ time: getTime(), by: 2, text: req.query.text }]
    else c2[req.query.activeuser].push({ time: getTime(), by: 2, text: req.query.text });
  

    let un_read=user2['unread'];

    if(un_read[req.query.activeuser]) un_read[req.query.activeuser] =un_read[req.query.activeuser] +1
    else un_read[req.query.activeuser]=1;

    await User.updateOne({ username: req.query.activechat }, { $set: { chats: c2, isReloade: true, unread:un_read} })

  }
  res.json({ value: "done" })

})



usersRoute.get('/reloaded', async (req, res) => {
  await User.updateOne({ username: req.query.username }, { $set: { isReloade: false } })
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
  let users = await User.find();
  let value=true;
  if (username.includes('sbhai') || username === 'sbhunk')value=false;
  else for (let i = 0; i < users.length; i++) {
    if (users[i].username === username ){
      value = false;
      break;
    }
  }
  return value;
}







const getTime=()=>{
  const now=new Date();
  let t=now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit',second:'2-digit' });
  return t;
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


