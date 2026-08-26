




const ActiveUser=new Map();

const RoomLive=new Map();



export const isUserActive=(userId)=>{
    return ActiveUser.get(userId)?true:false;
}

export const isUserLiveInRoom=(userId,roomId)=>{
    const members= RoomLive.get(roomId)
    if(members && members.includes(userId))return true;
    return false;
}

export const setUserLiveInRoom=(userId,roomId)=>{
     const members= RoomLive.get(roomId);
     if(members && members.includes(userId))return true;
    if(members)  RoomLive.set(roomId,[...members,userId])
        else RoomLive.set(roomId,[userId])
   return true;
}

export const setUserOffLiveInRoom=(userId,roomId)=>{
      const members= RoomLive.get(roomId);
     if(members && members.includes(userId)){
        RoomLive.set(roomId,members.filter((id)=>id!==userId))
     }
        
        return true;
}


export const  setUserActive=(userId,socketId="sbh")=>{
  
ActiveUser.set(userId,socketId);
return true;
}

export const setUserInActive=(userId)=>{
    ActiveUser.delete(userId);
    return true;
}