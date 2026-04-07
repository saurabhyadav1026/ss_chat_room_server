
import { error } from 'console';
import jwt from 'jsonwebtoken'
import { generateAccessToken } from './generateToken.js';


const refreshTheToken=(req,res)=>{

console.log("we will refresh your token")
    let token=req.cookies.refreshToken;
    
    
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(error,decoded)=>{
if(error){
    console.log(error)
res.status(420).send({message:"Session Expire"})
}
else{
console.log("token is refreshed")

console.log(decoded)
let token=generateAccessToken(decoded.payloade)
res.status(200).send({token:token})

}


    })



}

export default refreshTheToken;