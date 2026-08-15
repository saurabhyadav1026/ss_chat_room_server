

const isUsernameAvailble=async(req,res)=>{
try {const val =await User.find({"public_info.username":req.query.username});
  res.json({status:!val.length>0});
}catch(err){
  console.error(err);
  res.json({status:false})
}

}


export default isUsernameAvailble