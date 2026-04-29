import AiAssistance from "../../../ai/assistance-mode/index.js";
import addAiMessage from "../../../db/db/aiMessageOperation/addAiMessage.js";



const textAsk=async (roomId ,query)=>{

     if(!query)return {status:false,message:"empty query"}
query=query.trim();
if(query.length==0)return {status:false,message:"empty query"}

const response=await AiAssistance.textAssistance.getResponse(query);

    const msg=await addAiMessage (query,response,roomId);

 return {message:msg}

}

export default textAsk;