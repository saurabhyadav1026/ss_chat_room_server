
import express from 'express'
import VoiceAssistance from '../../ai/assistance-mode/voiceAssiststance/index.js';
import textAsk from './operations/textAsk.js';
import newChatAsk from './operations/newChatAsk.js';
import getRooms from '../../db/db/aiMessageOperation/getRooms.js';
import getMessages from '../../db/db/aiMessageOperation/getMessages.js';
import checkRoom from '../../db/db/aiMessageOperation/checkRoom.js';
import { genAI } from '../../ai/config/gemini.js';




const aiRouter =express.Router();




aiRouter.get("/voiceassistance",async(req,res)=>{
    try{
let result=await VoiceAssistance.getResponse(req.query.text);

res.send({status:true,responce:result})
    }
    catch(e){
     res.send({status:false,responce:"failed to connect, try again"})
        console.log(e)
    }
})


aiRouter.get("/textassistance/newask",async(req,res)=>{
    try{
let result=await  newChatAsk(req.userId,req.query.query)

res.send(result)
    }
    catch(e){
          res.send({status:false,responce:"failed to connect, try again"})
        console.log(e)
    }
})

aiRouter.get("/textassistance/ask",async(req,res)=>{
    try{
let result=await  textAsk(req.query.roomId,req.query.query)


res.send(result)
    }
    catch(e){
          res.send({status:false,responce:"failed to connect, try again"})
        console.log(e)
    }
})



aiRouter.get("/textassistance/rooms",async(req,res)=>{
    try{
let result=await getRooms(req.userId)


res.send(result)
    }
    catch(e){
          res.send({status:false,responce:"failed to connect, try again"})
        console.log(e)
    }
})


aiRouter.get("/textassistance/messages",async(req,res)=>{
    try{

  


let result=await getMessages(req.query.roomId)


res.send(result)
    }
    catch(e){
          res.send({status:false,responce:"failed to connect, try again"})
        console.log(e)
    }
})



aiRouter.get("/textassistance/checkRoom",async(req,res)=>{
    try{
let result=await checkRoom(req.query.roomId)


res.send(result)
    }
    catch(e){
          res.send({status:false,responce:"failed to connect, try again"})
        console.log(e)
    }
})


export default aiRouter;