import { genAI } from "../config/gemini.js"



/* 
gemini-2.5-flash
gemini-2.0-flash

*/

const createAiModel=(systemInstruction="",model_name="gemini-2.5-flash")=>{
    return async(prompt)=> genAI.models.generateContent({
        model:model_name,
        contents:[
            {
                role:"user",
                parts:[{text:prompt}]
            }
        ],
        systemInstruction:[
            {
                role:"system",
                parts:[{text:systemInstruction}]
            }
        ]
      
    })
}
export default createAiModel;