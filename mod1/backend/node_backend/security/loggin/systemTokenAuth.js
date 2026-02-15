

const auth=(req,res,next)=>{
console.log("we check your token")

console.log(req.headers.authorization)
console.log("authenticated")

next();
}



export default auth;