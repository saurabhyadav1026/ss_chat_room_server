import getResponse from "./getResponse.js";


const getRoomName=async(query)=>{

    const name=getResponse(` give me only topic name within 15 charecter for  "${query}"`);
    return name;
}
export default getRoomName;