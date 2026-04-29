import { genAI } from "../config/gemini.js";





const createEmbedding=async (chunk)=>{

    const model=genAI.getGenerativeModel({model:"gemini-embedding-2-preview"});
    const res=await model.embedContent({content:{parts:{text:chunk}}});
   
    return res.embedding.values;


}


export default createEmbedding;