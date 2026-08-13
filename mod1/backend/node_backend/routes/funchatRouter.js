
import express from 'express'
import funRoom from '../socketcomuniation/events-operations/funchats-event-operations/room.js';

import createFunRoom from '../controllers/funchat-controller/createFunRoom.js';


const funChatRouter = express.Router();


funChatRouter.get("/isroomcodeexist",(req,res)=>{
    console.log(req.query.roomCode)
    const funRoom_= funRoom.roomBox.get(req.query.roomCode);
    console.log(funRoom_)
  try{  if(!funRoom_){
    console.log("ye hua")
        res.status(200).send({status:false});
        return;
       
    }
    else  res.status(200).send({status:true});
}
catch(err) {
console.log(err);
res.status(500).send({status:false,message:"Internal server issue"})
}
})

funChatRouter.post("/createRoom",createFunRoom);

export default funChatRouter;

