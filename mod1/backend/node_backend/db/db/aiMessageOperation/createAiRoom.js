import Airoom from "../models/ai_room_model.js"



const createAiRoom=async (userId,name)=>{

return await Airoom.create({
    name,
    userId
})

}

export default createAiRoom;