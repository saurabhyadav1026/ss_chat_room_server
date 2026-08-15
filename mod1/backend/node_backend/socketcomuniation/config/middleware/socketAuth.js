import jwt from "jsonwebtoken";


const socketAuth=(socket,next)=>{


   try {
    const token=  socket.handshake.auth.token;
    if(token)jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
        }
        else {

          socket.userId=decoded.payloade._id;
 next();
}

        
    })

     }catch(err){
      console.error(err)



}
}

export default socketAuth;