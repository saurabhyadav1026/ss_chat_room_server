import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import MediaKit from './media/MediaKit.js'

//old API version
//import usersRout from './api/0.0.0/usersRout.js'


//new api version
import usersRout from './api/1.0.0/usersRout.js';
import connectDB from './db/db/db.js';
import getGenRes from './controll/getGenRes.js';
import multer from 'multer';


// for socket
import { Server } from 'socket.io';
import http from 'http';

import bodyParser from 'body-parser'
import User from './db/db/models/user_model.js'
import chatsocket from './socketcomuniation/chatsocket.js';
import cookieParser from "cookie-parser";
import appTokenAuth from './security/loggin/tokens/appTokenAuth.js';
import refreshTheToken from './security/loggin/tokens/refreshTheToken.js';

import aiRouter from './api/aiSection/aiRouter.js';
import sendOtp from './mail/sendOtp.js';
import forgetPassword from './security/loggin/forgetPassword.js';
import loggingRouter from './api/logging/logging_api.js';
import { socketIntegration } from './socketcomuniation/mainsocket.js';


dotenv.config()

// middleware setup
const app = express();
const server = http.createServer(app);


export const  io=socketIntegration(server);


app.use(cors({
  origin: process.env.FRONTEND_BASEURL, 
  methods: ["GET", 'POST', "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()) 


await connectDB();



// middleware
const storage = multer.memoryStorage(); // store file in memory as buffer
const upload = multer({ storage });


app.use('/users',appTokenAuth, usersRout);
app.use('/logging',loggingRouter);
app.use('/ai',aiRouter);


app.get('/sbh/gen', async (req, res) => {
  let text = await getGenRes(req.query.req)
  res.json({ value: text })
})

app.get('/getuserbyid',async(req,res)=>{
const {id}=req.query;

const u=await User.findOne({_id:id},{public_info:1})

return res.status(200).send(u.public_info);
})


app.get("/refreshtoken",(req,res)=>{

  refreshTheToken(req,res);
});





// for mediakit authentication
app.get('/get_authentiator', async (req, res) => {

  res.status(200).json(MediaKit.getAuthenticationParameters());
})

app.get("/isuseravailble",async(req,res)=>{
try {const val =await User.find({"public_info.username":req.query.username});
  res.json({status:!val.length>0});
}catch(err){
  console.log(err);
  res.json({status:false})
}

})
app.get('/getotp',async(req,res)=>{

await sendOtp(req.query.email,res)

});







// start server 
const port = process.env.PORT || 5120;
server.listen(port)
