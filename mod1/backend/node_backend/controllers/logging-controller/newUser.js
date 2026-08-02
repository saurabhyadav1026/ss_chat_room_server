

const newUser =async (req, res) => {

  const newU={
    name:req.body.name,
    username:req.body.username,
    password:await argon2.hash(req.body.password,{type:argon2.argon2id}),
    email:req.body.email.toLowerCase(),


  }

  await newUser(newU);

  res.status(200).json({username:req.body.username})
}


export default newUser