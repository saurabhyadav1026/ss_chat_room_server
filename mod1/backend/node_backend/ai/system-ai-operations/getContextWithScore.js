import AiMethods from "./index.js";
import AiContext from "../../db/ai-context/index.js";



const getContextWithScore=async(query)=>{

    const embedding=await AiMethods.createEmbedding(query);
   const res= AiContext.getContextWithScore(embedding);
   return res;


}

export default getContextWithScore;