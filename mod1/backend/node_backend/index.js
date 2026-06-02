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



import http from 'http';

import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import appTokenAuth from './security/loggin/tokens/appTokenAuth.js';
import refreshTheToken from './security/loggin/tokens/refreshTheToken.js';

import aiRouter from './api/aiSection/aiRouter.js';
import sendOtp from './mail/sendOtp.js';
import loggingRouter from './api/logging/logging_api.js';
import { socketIntegration } from './socketcomuniation/config/mainsocket.js'
import visitTracker from './security/privacy/visitTracker.js';
import funChatRouter from './api/funChatAPI/funChatRouter.js';

dotenv.config()

// middleware setup
const app = express();
const server = http.createServer(app);


const  io=socketIntegration(server);  


app.use(cors({
  origin: process.env.FRONTEND_BASEURL, 
  methods: ["GET", 'POST', "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()) 

try{
await connectDB();




app.use('/users',appTokenAuth, usersRout);
app.use('/logging',loggingRouter);
app.use('/ai',appTokenAuth,aiRouter);
app.use('/funchats',funChatRouter)

 

app.get('/newVisit',async(req,res)=>{
await visitTracker(req,res)

}) 





app.get("/refreshtoken",(req,res)=>{

  refreshTheToken(req,res);
});





// for mediakit authentication
app.get('/get_authentiator', async (req, res) => {

  res.status(200).json(MediaKit.getAuthenticationParameters());
})


app.get('/getotp',async(req,res)=>{

await sendOtp(req.query.email,res)

});










}catch(err){
  console.log("DB not connected")
}


// middleware
const storage = multer.memoryStorage(); // store file in memory as buffer
const upload = multer({ storage });








// start server 
const port = process.env.PORT || 5120;
server.listen(port)
