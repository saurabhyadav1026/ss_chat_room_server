

import AiContext from "../../db/ai-context/index.js";
import AiMethods from "./index.js";



const addContext = async (context)=>{

const chuncks=AiMethods.getContextChuncks(context);

for(let chunck of chuncks){
    const embedding=await AiMethods.createEmbedding(chunck);
  
    await AiContext.addContext(chunck,embedding)
}
}

export default addContext;





