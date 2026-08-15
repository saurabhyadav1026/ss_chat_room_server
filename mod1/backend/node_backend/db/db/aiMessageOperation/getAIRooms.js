import Airoom from "../models/ai_room_model.js"



const getAIRooms=async(userId)=>{

    const rooms=await Airoom.find({userId:userId});
    const rs={};
    rooms.forEach(room => {
        rs[room._id]=room;
    });
    return rs;
}

export default getAIRooms;