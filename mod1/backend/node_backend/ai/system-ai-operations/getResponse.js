import { genAI } from "../config/gemini.js"
import ai from './index.js'




const getResponse=async (query)=>{

const model=genAI.getGenerativeModel({model:"gemini-2.5-flash"});
const prompt=await ai.getPrompt(query)
const res=await model.generateContent(prompt);
return res.text;

}
export default getResponse;