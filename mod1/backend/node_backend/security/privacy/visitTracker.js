import Deviceinfo from "../../db/db/models/deviceinfo.js";


const visitTracker=async (req,res)=>{

    console.log("we will track you")
const deviceId=req.query.deviceId ;

console.log("device :"+deviceId)

const ip="103.211.19.111"               //req.headers['x-forward-for']|| req.socket.remoteAddress;
const latitude=req.query.latitude|""
const longitude=req.query.longitude||""


console.log(`https://free.freeipapi.com/api/json/${ip}`)
const geoInfo=await (await fetch(`https://free.freeipapi.com/api/json/${ip}`)).json();


let userId= null;


if(req.cookies.refreshToken){
                                   
    jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                console.log(error)
            }
            else {
    
              userId=decoded.payloade._id;
            }
        })

    }


const info= {
    
        userId,
        longitude,
        latitude,
        geoInfo
}

console.log(info)

if(deviceId!==""){
    console.log(deviceId)
    try{
await Deviceinfo.updateOne({_id:deviceId},{$push:{info:info}})
 res.send({status:true,newDevice:false})
    }catch(err){
           res.send({status:false,newDevice:false})
        console.log(err)
    }


}
else{

    const device=await Deviceinfo.create({info:[info]})
    res.status(200).send({status:true,newDevice:true,deviceId:device._id})
     
}





}

export default visitTracker;