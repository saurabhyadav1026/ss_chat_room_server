

import Chat_Room from "../../db/models/chat_room_model.js";



const getRoomsId=async(userId)=>{

    try{
        const rooms= await Chat_Room.find({members:userId},{_id:1});
    
        return rooms;
        
}catch(err){
    console.log(err);
    return [];
}


} 
export default getRoomsId;