import Airoom from "../models/ai_room_model.js"



const checkRoom=async(roomId)=>{

    const room= await Airoom.findOne({_id:roomId});
    if(room)return {status:true,roomId:room._id}
    else return {status:false}
}

export default checkRoom