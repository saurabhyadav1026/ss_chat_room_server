

import jwt from 'jsonwebtoken'

export const generateAccessToken=(payloade)=>{

return jwt.sign(
      {payloade:payloade},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"5m"}
)
}

export const generateRefreshToken=(payloade)=>{

return jwt.sign(
    {payloade:payloade},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:"15d"}
)
}