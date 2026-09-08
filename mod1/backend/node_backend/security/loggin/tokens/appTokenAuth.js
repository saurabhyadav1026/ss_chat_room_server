


import jwt from 'jsonwebtoken'
import { refreshAccessToken } from '../setlogged.js';


const appTokenAuth = (req, res, next) => {

    try{
    if (!req.cookies.accessToken || !req.cookies.refreshToken) { res.status(401).send({ message: "Not Authorized" }); return; }


    let token = req.cookies.accessToken;


 return   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {


        if (!error) {
            req.userId = decoded.payload._id;
            return next()
        }
        if (error.name === "TokenExpiredError") {

           return jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
                if (!error) {
                    req.userId = decoded.payload._id;
                    refreshAccessToken(res,decoded.payload._id);
                    return next()
                }

                 res.clearCookie("accessToken")
            res.clearCookie("refreshToken");
            res.status(420).send({ message: "Session Expire" })

        return;
              
            })

        }
            res.clearCookie("accessToken")
            res.clearCookie("refreshToken");
            res.status(420).send({ message: "Session Expire" })

        return;

   

    })



 }catch(err){
        console.log(err);
        res.clearCookie("accessToken")
            res.clearCookie("refreshToken");
            res.status(401).send({ message: "Unauthorized" })
    }



}


export default appTokenAuth;