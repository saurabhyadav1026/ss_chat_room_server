import  { voiceAssistanceModel } from "../index.js";

import instruction from "../instruction.js";


/* 
const getResponse=async (query)=>{

    return "hello this is ai response give by Saurabh . your query is "+query
    query=`
   system instruction: ${instruction}
 
    query: ${query}`

  let response = await fetch("http://localhost:11434/api/generate",
                   {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "qwen2.5-coder:1.5b",
                    prompt: query,
                    stream: false
                })
            }
);


return (await response.json()).response;

}



const getResponse=async (query)=>{

const prompt=`

Question: ${query}
`
const res=await voiceAssistanceModel.generateContent(prompt);
return res.text;

} 
 */


///


const getResponse=async (query)=>{
   
try{
const prompt=` I am using you as a voice assistance. so givve only the answer whch browwser     speechsynthises can easily pronounce the answer which question is below . and answewr should be short.
* Do not use markdown language.
*use symbol prooperly like  ',' , '.' , '"' etc.
Question: ${query }
`
const res=await voiceAssistanceModel(prompt);
const response = res.text;
 return response;
}catch(err){
    console.error(err)
    return "Your Free limit is Exceeded."
}



}


export default getResponse;