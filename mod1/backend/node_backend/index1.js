  import express from 'express';
import  cors from 'cors';
import dotenv from 'dotenv'
import MediaKit from './media/MediaKit.js'

import User from './api/1.0.0/dbschema.js';
//old API version
//import usersRout from './api/0.0.0/usersRout.js'


//new api version
import usersRout from './api/1.0.0/usersRout.js';
import connectDB from './db/db.js';
import getGenRes from './controll/getGenRes.js';
import multer from 'multer';


// for socket
import {Server} from 'socket.io';
import http from 'http';

import bodyParser from 'body-parser'
import { sendMsg } from './api/1.0.0/user.js';




 dotenv.config()
  

 export const users =new Map();

 

// middleware setup
const app=express();

const server=http.createServer(app);





const io= new Server(server,{ cors:{ origin:"*" }});




io.on('connection',(socket)=>{
 socket.emit('reloade')
  socket.on('register', async(data) => { 
     const {username,storekey,bundle}=data;
   
 const public_bundle={
     registrationId:bundle.registrationId,
     identityKey:toBase64(bundle.identityKey),
     preKey:{"keyId":1,"publicKey":toBase64(bundle.preKey.publicKey)},
     signedPreKey:{"keyId":1,"signature":toBase64(bundle.signedPreKey.signature),"publicKey":toBase64(bundle.signedPreKey.publicKey)},
     
 } 
 
    await User.updateOne({"public_info.username":username},{$set:{"public_info.public_bundle":public_bundle,"personal_info.storekey":storekey}})
     
   });


socket.on('sendtofriend',async(data)=>{
const { sender,reciever, senderCopy,recieverCopy}=data
await sendMsg(sender,reciever,senderCopy,recieverCopy);
  
})




socket.on('disconnect',()=>{
users.delete([...users].find(([k, v]) => v === socket.id)?.[0]);
console.log("disconncet")
})




})




app.use(cors({
  origin:"*",//"sspapp.netlify.app",
  methods:["GET",'POST',"PUT","DELETE"],
  credentials:true
}));
app.use(express.json());
app.use(bodyParser.json())
await connectDB(); 





export const doreloade=(a_username,b_username)=>{
    
      
  if(users.get(b_username)) {       
    io.to(users.get(b_username)).emit('reloade');}
    if(users.get(a_username))  {
 
      io.to(users.get(a_username)).emit('reloade');}
}







// middleware



const storage = multer.memoryStorage(); // store file in memory as buffer
const upload = multer({ storage });


app.use('/users',usersRout);

app.get('/sbh/gen',async(req,res)=>{
 let text=await getGenRes(req.query.req)
  res.json({value:text})
})


app.post('/user/setdp',upload.single("image"),async(req,res)=>{
  if(!req.file)res.status(400).send("file not found");
try{
  await User.updateOne({'public_info.username':req.body.username},{$set:{'public_info.dp':{img:req.file.buffer,imgtype:req.file.mimetype},},});

/* const sett =new app_data({type:'default',data:{no_dp:{img:req.file.buffer,imgtype:req.file.mimetype}}});
 await sett.save();
 */
res.status(200).send("DP updated successfully!");
}catch(e){
    return res.status(400).send("No file uploaded");
}

  }  
)


app.get('/get_authentiator',async(req,res)=>{
 
  res.json(MediaKit.getAuthenticationParameters());
})





// start server 
const port=process.env.PORT || 5000;
server.listen(port)
