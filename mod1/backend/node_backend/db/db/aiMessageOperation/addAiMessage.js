import Aimessage from "../models/ai_message_model.js"


const addAiMessage=async (query,response,roomId)=>{

   return await Aimessage.create({
query,
response,
roomId
   })


}

export default addAiMessage;