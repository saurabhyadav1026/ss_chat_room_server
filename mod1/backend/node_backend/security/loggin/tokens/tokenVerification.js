


import jwt from 'jsonwebtoken'


const tokenVerification =(req,res,next)=>{
console.log("token vrification start")
const token=req.headers.Authorization;
if(!token){
    console.log("verification failed")
return res.status(401).json({message:"token is missing"})
}
console.log("verification done")

token=token.split(" ")[1];

jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{

    if(err){
        return res.status(403).json({message:"invalid token "})
             
    }
 req.user_id=decoded;
 console.log("tokem verified")
 console.log(decoded)
 next();

}) 
}


export default tokenVerification;