  import express from 'express';
import  cors from 'cors';
import dotenv from 'dotenv'


//old API version
import usersRout from './api/0.0.0/usersRout.js'


//new api version
//import usersRout from './api/1.0.0/usersRout.js'
import connectDB from './db/db.js';
import getGenRes from './controll/getGenRes.js'



 dotenv.config()
  

 

// middleware setup
const app=express();
app.use(cors());
app.use(express.json());
await connectDB(); 

// middleware





app.use('/users',usersRout)
app.get('/sbh/gen',async(req,res)=>{
 let text=await getGenRes(req.query.req)
  res.json({value:text})
})



// start server 
const port=process.env.PORT || 5000;
app.listen(port)
