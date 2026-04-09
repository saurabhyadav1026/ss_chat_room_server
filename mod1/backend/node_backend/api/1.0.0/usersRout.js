


import express from 'express';
import User  from '../../db/db/models/user_model.js'

import sendOtp from '../../mail/sendOtp.js';

import newUser from '../usersSection/new_user.js';
import getChatsList,{getchatRoom} from '../../db/user/chatList.js';
import getSearchList from '../../db/user/searchList.js';

import { getMessages } from '../../db/user/getMessages.js';
  
import googleAuthVerification from '../../security/loggin/googleAuthVerification.js';

import setLogged, { getLogginedUser, setLoggetOut } from '../../security/loggin/setlogged.js';
import getRoomByUserId, { getRoomIdByReceiverId } from '../../db/room-operations/get-room/getRoomByReceiverId.js';
import getRoomByRoomId from '../../db/room-operations/get-room/getRoomByRoomId.js';
import getRoomByReceiverId from '../../db/room-operations/get-room/getRoomByReceiverId.js';




const usersRoute = express.Router();







usersRoute.post('/setdp' ,async(req,res)=>{

  try{
let u=await User.updateOne({_id:req.user_id},{$set:{'public_info.dp':req.body.dpurl}})

res.status(200).json({status:true})
  }
  catch(e){
    console.log(e)
    res.status(400).json({status:false})
  } 
})


usersRoute.get("/searchlist",async(req,res)=>{

try{  const {input}=req.query;
  console.log(input)
 
  let list=await getSearchList(input);
  console.log(list)
  res.status(200).send(list)
}catch(err){
  console.log(err);

}
})

usersRoute.get("/getmessages",async(req,res)=>{
const userId=req.userId
  try{const roomId=req.query._id;
  const messages=await getMessages(userId,roomId);
    
  res.status(200).send({messages:messages});
}catch(err){
  console.log(err)
  res.status(320).send({})
}
})







usersRoute.get("/getchatslist",async(req,res)=>{

try{
const list=await getChatsList(req.userId);
res.status(200).send(list)
}
catch(err){
  console.log(err)
}

})




usersRoute.get("/verifyme",async(req,res)=>{

  try {
  await getLogginedUser(req,res);

  }catch(err){

    res.status(420).send({status:false,user:{}})
  }

})



usersRoute.get("/userprofile",async(req,res)=>{
   
   try{  const user = await User.findOne({"_id": req.query._id })
   
   const _user={
       _id:user._id,
       name:user.public_info.name,
       username:user.public_info.username,
       dp:user.public_info.dp,
       about:user.public_info.about,
     }
   res.status(200).json({status:true,user:_user});
   
   }
   catch(err){
     console.log(err);
     res.status(421).send({staus:false})
   }
})



usersRoute.get("/getroombyroomid",async(req,res)=>{
  let room;
  if(req.query._id.slice(0,3)=="new"){
    room=await getRoomByReceiverId(req.userId,req.query._id.slice(3));
  }

  else room=await getRoomByRoomId(req.userId,req.query._id);

console.log(room);
  res.status(200).send({room:room});

})



usersRoute.get("/getroomidbyreceiverid",async(req,res)=>{
  const room=await getRoomIdByReceiverId(req.userId,req.query._id);
 
console.log(room);
  res.status(200).send(room);

})


usersRoute.post("/logoutme",(req,res)=>{

try{  
  setLoggetOut(req,res);
  res.json({status:true})

}
catch(err){
  console.log(err);
  res.json({status:false})
}

})

export default usersRoute;













