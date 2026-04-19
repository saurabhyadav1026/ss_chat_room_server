import User from '../../db/db/models/user_model.js';
import { generateAccessToken, generateRefreshToken } from '../../security/loggin/tokens/generateToken.js';


const setLogged=(res,userId)=>{



  const refresh_token=generateRefreshToken({_id:userId});



  res.cookie("refreshToken",refresh_token,
    {httpOnly:true,
      sameSite:"None",
      secure:true,
      maxAge:30*24*60*60*1000,
    })

 return {status:true}


}

export default setLogged;



export const setLoggetOut=(req,res)=>{

  res.clearCookie("refreshToken",{
    httpOnly:true,
      sameSite:"None",
      secure:true,
      maxAge:30*24*60*60*1000,

  });
}



export const getLogginedUser=async(req,res)=>{

try{  const user = await User.findOne({"_id": req.userId })

  const access_token=generateAccessToken({_id:req.userId});

const _user={
    _id:user._id,
    name:user.public_info.name,
    username:user.public_info.username,
    dp:user.public_info.dp,
    about:user.public_info.about,
  }

res.status(200).json({status:true,user:_user,token:access_token});

}
catch(err){
  console.log(err);
  res.status(420).send({staus:false})
}

}

