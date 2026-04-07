import User from '../../db/db/models/user_model.js';
import { generateAccessToken, generateRefreshToken } from '../../security/loggin/tokens/generateToken.js';


const setLogged=(res,userId,isNewUser)=>{


  const access_token=generateAccessToken({_id:userId});

  const refresh_token=generateRefreshToken({_id:userId});



  res.cookie("refreshToken",refresh_token,
    {httpOnly:true,
      sameSite:"strict",
      secure:true,
      maxAge:30*24*60*60*1000,
    })

console.log("we are setting you")
  res.json({status:true, isNewUser:isNewUser, accessToken:access_token});


}

export default setLogged;



export const getLogginedUser=async(req,res)=>{
  console.log("we will provide you loggined user")

try{  const user = await User.findOne({"_id": req.userId })

const _user={
    _id:user._id,
    name:user.public_info.name,
    username:user.public_info.username,
    dp:user.public_info.dp,
    about:user.public_info.about,
  }
console.log(_user)
res.status(200).json({status:true,user:_user});

}
catch(err){
  console.log(err);
  res.status(420).send({staus:false})
}

}

