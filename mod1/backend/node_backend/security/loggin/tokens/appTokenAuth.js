


import jwt from 'jsonwebtoken'


const appTokenAuth = (req, res, next) => {


if(!req.cookies.refreshToken){res.status(200).send({ message: "Session Expire" });return;}

    
    let token = req.cookies.refreshToken;


    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            console.log(error)
            res.clearCookie("refreshToken");
            res.status(420).send({ message: "Session Expire" })
        }
        else {
            console.log("token is refreshed")

          req.userId=decoded.payloade._id;
 next();

        }
    })


    /*   token auth
const accessToken=req.headers.authorization;
if(!accessToken){
return res.status(401).json({message:"token is missing"})
}
let token=accessToken.split(" ")[1];
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{

    if(err){
        console.log(err)
        return res.status(401).json({message:"invalid token "})
             
    }
 req.userId=decoded.payloade._id;
 console.log("authentication successfull");
 next();

})  */
}


export default appTokenAuth;