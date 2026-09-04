

import Chat_Room from "../../db/models/chat_room_model.js";



const getRoomsId=async(userId)=>{

    try{
        const rooms= await Chat_Room.find({members:userId},{members:1});
    
const idList=[]
rooms.forEach((room)=>{
const id= room.members[0].toString()===userId?room.members[1].toString():room.members[0].toString();
idList.push(id)
})

        return idList;
        
}catch(err){
    console.error(err);
    return [];
}


} 
export default getRoomsId;