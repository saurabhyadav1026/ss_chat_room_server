import { chatBuddy } from "../index.js";



const getResponse=async(query)=>{

const prompt=  `
${query}
`

console.log(query)
const res=await chatBuddy.generateContent(query);
console.log(res.response)
return res.text;
}


export default getResponse;