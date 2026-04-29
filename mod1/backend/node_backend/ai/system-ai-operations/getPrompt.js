
import AiContext from '../../db/ai-context/index.js';
import ai from './index.js'

const getPrompt=async (query)=>{

    const queryEmbedding= await ai.createEmbedding(query);
    const docs=await AiContext.getContext(queryEmbedding);

    const context=docs.map(d=>d.text).join("\n");

    const prompt= `
    Answer by using this context given below----- 
    Context:${context},
    Question:${query}
    
    `
return prompt;
}

export default getPrompt;