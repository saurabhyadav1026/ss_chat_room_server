
import AiAssistance from "../../../ai/assistance-mode/index.js";
import createAiRoom from "../../../db/db/aiMessageOperation/createAiRoom.js";
import addAiMessage from "../../../db/db/aiMessageOperation/addAiMessage.js"


const newChatAsk=async (userId ,query)=>{


     if(!query)return {status:false,message:"empty query"}
query=query.trim();
if(query.length==0)return {status:false,message:"empty query"}

const response=await AiAssistance.textAssistance.getResponse(query);

    const name=await AiAssistance.textAssistance.getRoomName(query)
    const room=await createAiRoom(userId,name)
   const msg=await addAiMessage(query,response,room._id);
   return {room:room,message:msg}
}


export default newChatAsk;