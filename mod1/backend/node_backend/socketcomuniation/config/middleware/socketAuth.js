import jwt from "jsonwebtoken";


const socketAuth=(socket,next)=>{


   try {
    const token=  socket.handshake.auth.token;
    if(!token) throw new Error("No Token");
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
       console.log(error)
        }
        else {

          socket.userId=decoded.payloade._id;
 next();
}

        
    })

     }catch(err){
      console.log(err)



}
}

export default socketAuth;