import jwt from "jsonwebtoken";


const socketAuth=(socket,next)=>{


   try {
    const token=  socket.handshake.auth.token;
    if(!token) throw new Error("No Token");
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            throw error;
        }
        else {

          socket.userId=decoded.payloade._id;
 console.log("socket authentication successfull of user :  "+socket.userId);
 next();
}

        
    })

     }catch(err){
next(new Error("unauthorized"));

}
}

export default socketAuth;