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

import { User, Message, Chat_Room } from './db/db/dbschema.js'
import chatsocket from './socketcomuniation/chatsocket.js';
dotenv.config()

// middleware setup
const app = express();
const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });

io.on('connection',socket=>chatsocket(socket) );
app.use(cors({
  origin: "*",//"sspapp.netlify.app",
  methods: ["GET", 'POST', "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json()) 
await connectDB();
// middleware
const storage = multer.memoryStorage(); // store file in memory as buffer
const upload = multer({ storage });
app.use('/users', usersRout);

app.get('/sbh/gen', async (req, res) => {
  let text = await getGenRes(req.query.req)
  res.json({ value: text })
})


app.post('/user/setdp', upload.single("image"), async (req, res) => {
  if (!req.file) res.status(400).send("file not found");
  try {
    await User.updateOne({ 'public_info.username': req.body.username }, { $set: { 'public_info.dp': { img: req.file.buffer, imgtype: req.file.mimetype }, }, });

    /* const sett =new app_data({type:'default',data:{no_dp:{img:req.file.buffer,imgtype:req.file.mimetype}}});
     await sett.save();
     */
    res.status(200).send("DP updated successfully!");
  } catch (e) {
    return res.status(400).send("No file uploaded");
  }

}
)


app.get('/get_authentiator', async (req, res) => {

  res.json(MediaKit.getAuthenticationParameters());
})





// start server 
const port = process.env.PORT || 5000;
server.listen(port)
