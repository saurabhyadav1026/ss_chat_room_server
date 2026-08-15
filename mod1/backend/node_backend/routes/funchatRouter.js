
import express from 'express'
import funRoom from '../socketcomuniation/events-operations/funchats-event-operations/room.js';

import createFunRoom from '../controllers/funchat-controller/createFunRoom.js';
import { deflateSync } from 'node:zlib';


const funChatRouter = express.Router();


funChatRouter.get("/isroomcodeexist",(req,res)=>{
 
    const funRoom_= funRoom.roomBox.get(req.query.roomCode);
   
  try{  if(!funRoom_){
   
        res.status(200).send({status:false});
        return;
       
    }
    else  res.status(200).send({status:true});
}
catch(err) {
console.error(err);
res.status(500).send({status:false,message:"Internal server issue"})
}
})

funChatRouter.post("/createRoom",createFunRoom);

export default funChatRouter;





