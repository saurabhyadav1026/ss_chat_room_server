import AiAssistance from "../../../ai/assistance-mode/index.js";


const voiceAsk=async (query)=>{

     if(!query)return {status:false,message:""}
query=query.trim();
if(query.length==0)return {status:false,message:""}

const response=await AiAssistance.voiceAssistance.getResponse(query);
 
 return {message:response}

}

export default voiceAsk;