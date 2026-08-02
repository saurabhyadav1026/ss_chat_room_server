


import express from 'express';
import User  from '../../db/db/models/user_model.js'
import getSearchList from '../../db/user/searchList.js';

import getMessages from "../../db/message-operations/getMessages.js"
import getRoomByRoomId from '../../db/room-operations/get-room/getRoomByRoomId.js';
import getRoomByReceiverId, { getRoomIdByReceiverId } from '../../db/room-operations/get-room/getRoomByReceiverId.js';
import getRooms from '../../db/room-operations/get-room/getRooms.js';
import { changeDP, updateMe } from '../../db/user-update/updateProfile.js';
import { getLogginedUser, setLoggetOut } from '../../security/loggin/setlogged.js';


const usersRoute = express.Router();



/** 
 * @swagger
 * /users/updateme:
 *   get:
 *   summary: Update user profile information
 *     description: Update the user's name and about information.
 */

usersRoute.get("/updateme",async (req,res)=>{
  try{
const result= await updateMe(req.userId,req.query.newname,req.query.newabout);
res.status(200).send(result)
  }
  catch (err){
    console.log(err)
    req.status(200).send({status:false, msg:"error"})
  }
})


usersRoute.get("/updatedp",async (req,res)=>{
  try{
const result= await changeDP(req.userId,req.query.newDP);
res.status(200).send(result)
  }
  catch (err){
    console.log(err)
    req.status(200).send({status:false, msg:"error"})
  }
})

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
  let list=await getSearchList(input);
  res.status(200).send(list)
}catch(err){
  console.log(err);

}
})

usersRoute.get("/getmessages",async(req,res)=>{
const userId=req.userId
  try{const roomId=req.query._id;
  const messages=await getMessages(userId,roomId,req.query.cursor);
  
   if(messages.status) res.status(200).send({messages:messages.data});
   else res.status(400).send({messages:"error"});
 
}catch(err){
  console.log(err)
  res.status(401).send({status:false})
}
})







usersRoute.get("/getchatslist",async(req,res)=>{

try{
 

const list=await getRooms(req.userId, req.query.page);

res.status(200).send(list)
}
catch(err){
  console.log(err)
}

})




usersRoute.get("/verifyme",async(req,res)=>{

  try {

  const response=await getLogginedUser(req); 
  
  res.status(200).json(response);

  }catch(err){
 console.log("verify me error")
    
    res.status(420).send({status:false,user:{}})
  }

})



usersRoute.get("/userprofile",async(req,res)=>{
   
   try{  const user = await User.findOne({"public_info.username": req.query.username })
   if(!user)return {}
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

  res.status(200).send({room:room});

})



usersRoute.get("/getroomidbyreceiverid",async(req,res)=>{
  const room=await getRoomIdByReceiverId(req.userId,req.query._id);
 

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




usersRoute.get("/clearchat",(req,res)=>{

  const {roomId}=req.query

  res.send({status:true})
})

usersRoute.get("/lockchat",(req,res)=>{

  const {roomId}=req.query
    res.send({status:true})
})

usersRoute.get("/hidechat",(req,res)=>{

  const {roomId}=req.query
    res.send({status:true})
})

usersRoute.get("/blockuser",(req,res)=>{

  const receiverId=req.query._id
    res.send({status:true})
})

usersRoute.get("/reportuser",(req,res)=>{

  const receiverId=req.query._id
    res.send({status:true})
})


export default usersRoute;













