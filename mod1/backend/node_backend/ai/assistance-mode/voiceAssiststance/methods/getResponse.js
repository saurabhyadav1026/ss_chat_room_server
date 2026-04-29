import  { voiceAssistanceModel } from "../index.js";







const getResponse=async (query)=>{

const prompt=`

Question: ${query}
`
const res=await voiceAssistanceModel.generateContent(prompt);
return res.text;

}
export default getResponse;