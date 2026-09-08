

import jwt from 'jsonwebtoken'

export const generateAccessToken=(payload)=>{

return jwt.sign(
      {payload:payload},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"60m"}
)
}

export const generateRefreshToken=(payload)=>{

return jwt.sign(
    {payload:payload},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:"15d"}
)
}

export const generateOTPToken=(payloade)=>{
 
return jwt.sign(
    {payload:payload},
    process.env.OTP_TOKEN_SECRET,
    {expiresIn:"6m"}
)   
}