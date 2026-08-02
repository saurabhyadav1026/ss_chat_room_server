
import express from 'express'
import funRoom from '../socketcomuniation/events-operations/funchats-event-operations/room.js';

import createFunRoom from '../controllers/funchat-controller/createFunRoom.js';


const funChatRouter = express.Router();


funChatRouter.get("/isroomcodeavailble",(req,res)=>{
    if(!funRoom.roomBox.get(req.query.roomCode)){
        res.status(200).send({status:true});
        return;
       
    }
    else  res.status(401).send({status:false});
})

funChatRouter.post("/createRoom",createFunRoom);

export default funChatRouter;

