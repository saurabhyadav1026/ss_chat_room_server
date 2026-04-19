
import { error } from 'console';
import jwt from 'jsonwebtoken'
import { generateAccessToken } from './generateToken.js';


const refreshTheToken=(req,res)=>{
    let token=req.cookies.refreshToken;
    
    
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(error,decoded)=>{
if(error){
    console.log(error)
res.status(420).send({message:"Session Expire"})
}
else{

let token=generateAccessToken(decoded.payloade)
res.status(200).send({token:token})

}


    })



}

export default refreshTheToken;