import jwt from "jsonwebtoken";


const socketAuth=(socket,next)=>{


   try {
    const token=  socket.handshake.auth.token;
    if(token)jwt.verify(token,process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          console.error(error)
        }
        else {

          socket.userId=decoded.payload._id;
 next();
}

        
    })

     }catch(err){
      console.error(err)



}
}

export default socketAuth;