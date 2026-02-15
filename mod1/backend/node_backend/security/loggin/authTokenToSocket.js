
import jwt from "jsonwebtoken";


const authTokenToSocket=async (req,res,next)=>{

const refreshToken=req.cookies.refreshToken;
const accessToken=req.headers.authorization;

const payloade=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
if(payloade){
const {socketId}=req.query;
 await User.updateOne({ _id: payloade._id },{$addToSet:{socketId:socketId}})
next();
}



else{
    res.send(401)
}





}