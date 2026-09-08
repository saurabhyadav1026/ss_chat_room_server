import User from '../../db/db/models/user_model.js';
import { generateAccessToken, generateRefreshToken } from '../../security/loggin/tokens/generateToken.js';


const setLogged=(res,userId)=>{



  const refresh_token=generateRefreshToken({_id:userId});
  const access_token=generateAccessToken({_id:userId})



  res.cookie("refreshToken",refresh_token,
    {httpOnly:true,
      sameSite:"None",
      secure:true,
      maxAge:15*24*60*60*1000,
    })

     res.cookie("accessToken",access_token,
    {httpOnly:true,
      sameSite:"None",
      secure:true,
      maxAge:60*60*1000,
    })
console.log("okko")
 return true


}

export default setLogged;



export const setLoggetOut=(req,res)=>{

  res.clearCookie("refreshToken",{
    httpOnly:true,
      sameSite:"None",
      secure:true,
      maxAge:15*24*60*60*1000,

  });

    res.clearCookie("accessToken",
    {httpOnly:true,
      sameSite:"None",
      secure:true,
      maxAge:60*60*1000,
    })

    return true
}



export const getLogginedUser=async(req)=>{

try{  const user = await User.findOne({"_id": req.userId })

  const refresh_socket_token=generateRefreshToken({_id:req.userId});

const _user={
    _id:user._id,
    name:user.public_info.name,
    username:user.public_info.username,
    dp:user.public_info.dp,
    about:user.public_info.about,
  }
 
return {status:true,user:_user,token:refresh_socket_token}


}
catch(err){
  console.error(err);
  
}

}


export const refreshAccessToken=(res,userId)=>{
const access_token=generateAccessToken({_id:req.userId});
   res.clearCookie("accessToken",access_token,
    {httpOnly:true,
      sameSite:"None",
      secure:true,
      maxAge:60*60*1000,
    })
    return true;
}
