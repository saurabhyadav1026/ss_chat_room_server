  import express from 'express';
import  cors from 'cors';
import dotenv from 'dotenv'
import MediaKit from './media/MediaKit.js'

import User,{app_data} from './api/1.0.0/dbschema.js';
//old API version
//import usersRout from './api/0.0.0/usersRout.js'


//new api version
import usersRout from './api/1.0.0/usersRout.js';
import connectDB from './db/db.js';
import getGenRes from './controll/getGenRes.js';
import multer from 'multer';

 dotenv.config()
  

 

// middleware setup
const app=express();
app.use(cors());
app.use(express.json());
await connectDB(); 

// middleware



const storage = multer.memoryStorage(); // store file in memory as buffer
const upload = multer({ storage });


app.use('/users',usersRout);

app.get('/sbh/gen',async(req,res)=>{
  console.log(req.query.req)
  console.log("generating...")
 let text=await getGenRes(req.query.req)
 console.log("generated")
 console.log(text)
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
app.listen(port)
