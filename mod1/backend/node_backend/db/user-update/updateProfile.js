import User from "../db/models/user_model.js"




export const changeName=async(userId,newName)=>{
    newName=newName.trim()
if(!userId||!newName|| newName==="")return{status:false,msg: "Something is missing, user not loggin or empty name"}
  try { const user=await User.findOneAndUpdate(
        {_id:userId},
        {$set:{"public_info.name":newName}}
    )
return {status:true,newName}
} catch(err){
        console.error(err);
        return {status:false,msg: "failed to update name"}
    }
}

export const changeUsername=async(userId,newUsername)=>{
    newUsername=newUsername.trim()
if(!userId||!newUsername|| newUsername==="")return {status:false,msg: "Something is missing, user not loggin or empty username"}

if(await User.find({"public_info.username":newUsername}))return {status:false,msg:"username not availble."}

  try{  const user=await User.findOneAndUpdate(
        {_id:userId},
        {$set:{"public_info.username":newUsername}}

    )
    return {status:true,newUsername}
    }
    catch(err){
        console.error(errr);
        return {status:false,msg: "failed to update username"}
    }
}




export const changeAbout=async(userId,newAbout)=>{
    newAbout=newAbout.trim();
if(!userId||!newAbout|| newAbout==="")return {status:false,msg: "Something is missing, user not loggin or empty username"}


  try{  const user=await User.findOneAndUpdate(
        {_id:userId},
        {$set:{"public_info.about":newAbout}}

    )
    return {status:true,newAbout}
    }
    catch(err){
        console.error(errr);
        return {status:false,msg: "failed to update username"}
    }
}

export const changeDP=async(userId,newDP)=>{
    newDP=newDP.trim();
if(!userId||!newDP|| newDP==="")return {status:false,msg: "Something is missing, user not loggin or no dp"}


  try{  const user=await User.findOneAndUpdate(
        {_id:userId},
        {$set:{"public_info.dp":newDP}}

    )
    return {status:true,newDP}
    }
    catch(err){
        console.error(errr);
        return {status:false,msg: "failed to update username"}
    }
}




export const updateMe=async(userId,newName,newAbout)=>{
    newAbout=newAbout.trim();
if(!userId||!newAbout|| newAbout==="")return {status:false,msg: "Something is missing, user not loggin or empty name or About"}


  try{  const user=await User.findOneAndUpdate(
        {_id:userId},
        {$set:{"public_info.name":newName,"public_info.about":newAbout}}

    )
    return {status:true,newName,newAbout}
    }
    catch(err){
        console.error(err);
        return {status:false,msg: "failed to update username"}
    }
}



