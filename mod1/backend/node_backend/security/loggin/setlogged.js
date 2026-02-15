import { generateAccessToken, generateRefreshToken } from '../../security/loggin/tokens/generateToken.js';


const setLogged=(res,user)=>{


  const access_token=generateAccessToken({_id:user._id});

  const refresh_token=generateRefreshToken({_id:user._id});

const _user={
    _id:user._id,
    name:user.public_info.name,
    username:user.public_info.username,
    dp:user.public_info.dp,
    about:user.public_info.about,
    accessToken:access_token
  }

  res.cookie("refreshToken",refresh_token,
    {httpOnly:true,
      sameSite:"strict",
      secure:true,
      maxAge:30*24*60*60*1000,
    })


  res.json({status:true, value:_user,accessToken:access_token});


}

export default setLogged;