

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';



dotenv.config();



const genAI = new GoogleGenerativeAI(process.env.GEN_API)





const getGenRes=async(prompt)=>{
let text="";
    try {
     
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
      const result = await model.generateContent(prompt);
       text =  result.response.text();
      
    } catch(e){ console.log(e) }

     return text;
 
}



export default getGenRes;  