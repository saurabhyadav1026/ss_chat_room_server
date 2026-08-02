import { chatBuddy } from "../index.js";



const getResponse=async(query)=>{

const prompt=  `
${query}
`

const res=await chatBuddy.generateContent(query);

return res.text;
}


export default getResponse;