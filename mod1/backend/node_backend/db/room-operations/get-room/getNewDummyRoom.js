
import { isUserActive, isUserLiveInRoom } from "../../../socketcomuniation/data/userio/connectedusers.js";
import User from "../../db/models/user_model.js";


const getNewDummyRoom=async(userId,roomId)=>{

try{

  const receiverId= roomId.split("-").filter((id)=>id !==userId)[0];

let user = await User.findOne({_id:receiverId},{_id:1,public_info:1})
    
    if(!user)return null;
          
   const room={

      _id:roomId,
        receiver: {
              _id: user._id,
              isUserActive:isUserActive(user._id.toString())?true:false,
              ...user.public_info
            },
            isLive:isUserLiveInRoom(user._id.toString(),roomId)?true:false,
            lastMessage:{
                id:"",
                senderId:"",
                test:""
            }
       
      }
  return room;
    }
    catch(err){
      console.error(err);
      return null;
    }
}

export default getNewDummyRoom;




export const getSelfRoom=async(userId,roomId)=>{

try{

 
let user = await User.findOne({_id:members[0]},{_id:1,public_info:1})
    
    if(!user)return null;
          
   const room={

      _id:roomId,
        receiver: {
              _id: user._id,
              ...user.public_info,
             
            },
            lastMessage:{
                id:"",
                senderId:"",
                test:""
            }
       
      }

room.receiver.name=room.receiver.name+" (You)";

  return room;
    }
    catch(err){
      console.error(err);
      return null;
    }
}


