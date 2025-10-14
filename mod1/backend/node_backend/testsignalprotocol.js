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
import { buffer } from 'stream/consumers';




 dotenv.config()
  

 export const users =new Map();

 

// middleware setup
const app=express();

const server=http.createServer(app);





const io= new Server(server,{ cors:{ origin:"*" }});

const toBase64 = (arr) => Buffer.from(new Uint8Array(arr)).toString("base64");


const fromBase64 = (b64) => {
  console.log("frombase64")
  console.log(b64)
  const buf = Buffer.from(b64, "base64"); // Node.js Buffer
  const arrbuff=buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  console.log("buf")
  console.log(arrbuff)
  return arrayBufferToBase64(arrbuff);//buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
};


const arrayBufferToBase64=(buffer) =>{
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  // standard Base64
  let base64 = btoa(binary);
  // convert to URL-safe Base64
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}






io.on('connection',(socket)=>{
  console.log(`user connected: ${socket.id}`);
  socket.emit("connection");

  socket.on('register', async(data) => {       
    
    const {username,storekey,bundle}=data;
    console.log("registering...")
    console.log(bundle)

const public_bundle={
    registrationId:bundle.registrationId,
    identityKey:toBase64(bundle.identityKey),
    preKey:{"keyId":1,"publicKey":toBase64(bundle.preKey.publicKey)},
    signedPreKey:{"keyId":1,"signature":toBase64(bundle.signedPreKey.signature),"publicKey":toBase64(bundle.signedPreKey.publicKey)},
    


}

console.log("pulic bundle")
console.log(public_bundle)


   await User.updateOne({"public_info.username":username},{$set:{"public_info.public_bundle":public_bundle,"personal_info.storekey":storekey}})
   
console.log("registered")
  });


  

socket.on('disconnect',()=>{
users.delete([...users].find(([k, v]) => v === socket.id)?.[0]);
console.log("disconncet")
})




socket.on("sendMessage",(data)=>{
  const {sender,reciever,senderCopy,recieverCopy}=data
  sendMsg(socket,sender,reciever,senderCopy,recieverCopy)
  doreloade(sender,reciever)
})




socket.on("getCreateSession",async({sender,reciever})=>{
  console.log("we prepare to send bundle")
 const data={
    sender:sender,
    reciever:reciever,
    recieverBundle: await getbundle(reciever)
  }
  console.log("we going to send bundle")
  console.log(data)

  console.log("checking bundle")
console.log("IdentityKey type:", data.recieverBundle.identityKey.constructor.name);
console.log("PreKey type:", data.recieverBundle.preKey.publicKey.constructor.name);
console.log("SignedPreKey type:",  data.recieverBundle.signedPreKey.publicKey.constructor.name);


  socket.emit('createSession',data);
})

});

app.use(cors({
  origin:"http://127.0.0.1:5173",
  methods:["GET",'POST',"PUT","DELETE"],
  credentials:true
}));
app.use(express.json());
app.use(bodyParser.json())
await connectDB(); 


const getbundle=async(username)=>{
console.log("dffr")
let public_bundle=await User.findOne({"public_info.username":username},{"public_info.public_bundle":1})
console.log("public bundle")
public_bundle=public_bundle.public_info.public_bundle;
console.log(public_bundle)

console.log("coverting public bundle to bndle")

  const bundle={
    registrationId:public_bundle.registrationId,
    identityKey:   fromBase64(public_bundle.identityKey),
    preKey:{"keyId":1,"publicKey":fromBase64(public_bundle.preKey.publicKey)},
    signedPreKey:{"keyId":1,"signature":fromBase64(public_bundle.signedPreKey.signature),"publicKey":fromBase64(public_bundle.signedPreKey.publicKey)},
    


}


console.log("send bund")
console.log(bundle)
return bundle;
}




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
