import textAssistance, { textAssistanceModel } from "../index.js";







const getResponse=async (query)=>{
   
try{
const prompt=`

Question: ${query}
`
const res=await textAssistanceModel(prompt);
const response = res.text;
 return response;
}catch(err){
    console.log(err)
    return "Your Free limit is Exceeded."
}



}
export default getResponse;