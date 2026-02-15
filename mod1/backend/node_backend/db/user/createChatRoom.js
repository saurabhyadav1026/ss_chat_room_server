import { Chat_Room } from "../db/dbschema.js"



const createChatRoom=async(members)=>{


   


    const {_id}=await Chat_Room.findOneAndUpdate({members:members},{$setOnInsert:{members:members}},{new:true,upsert:true})
       
    return _id;


}
export default createChatRoom;