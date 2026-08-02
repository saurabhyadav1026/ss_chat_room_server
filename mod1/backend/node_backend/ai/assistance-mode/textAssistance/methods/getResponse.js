import textAssistance, { textAssistanceModel } from "../index.js";

import instruction from "../instruction.js";


/* 

const getResponse=async (query)=>{
   // return await chat(query);
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




async function chat(query) {
  const response = await Ollama.chat({
    model: 'llama3.2',
    messages: [
      {
        role: 'user',
        content: query
      },
      {role:"system", 
        content:instruction
      }
    ]
  })

 return response.message.content;
}

 */



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