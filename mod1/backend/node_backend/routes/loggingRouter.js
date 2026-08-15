import express from 'express'
import isUsernameAvailble from '../controllers/logging-controller/isUserNameAvailable';
import newUser from '../controllers/logging-controller/newUser';


const loggingRouter = express.Router();




loggingRouter.get('/newuser', newUser);



loggingRouter.get("/isuseravailble",isUsernameAvailble)


loggingRouter.post("/googleAuthVerification",async(req,res)=>{


res.status(200).send(await googleAuthVerification(res,req.body.token))
})




loggingRouter.get('/verifyuser', async (req, res) => {

try { const u = await User.findOne({"public_info.username": req.query.username })

  if (u && await argon2.verify(u._doc.personal_info.password ,req.query.password)) {  // checksbhbug
    
setLogged(res,u._id)

}
  
 else{
  
  res.status(200).json({staus:false})}}
 catch(err){
  console.error(err);
 
  res.status(403).json({status:false})
 }

})


loggingRouter.get("/forgetpassword",async (req,res)=>{
try{
   
  res.status(200).send({status:await forgetPassword(req.query.email.toLowerCase())})
}
catch(err){
  console.error(err);
  res.status(399).send({status:false})
}
})


loggingRouter.get("/verifyresetpasswordlink",async(req,res)=>{
let val=false;

   val=await verifyResetPasswordLink(req.headers.authorization.split(" ")[1]);
res.status(200).send({status:val})

})


loggingRouter.get("/setpassword",async (req,res)=>{
  const token=req.headers.authorization.split(" ")[1];
  if(!token || !req.query.password){res.status(399).send({status:false}); return;}
  let status=true;
    try{

status= await resetPassword(token,req.query.password)
    }
catch(err){
    console.error(err);
    status=false;
  
}
   
  res.status(200).send({status:status});

})





export default loggingRouter;
