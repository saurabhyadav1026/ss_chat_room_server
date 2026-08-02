import  argon2 from "argon2";
import funRoom from "../../socketcomuniation/events-operations/funchats-event-operations/room.js";



const createFunRoom=async(req,res)=>{
    const room={};

room["roomCode"]=req.body.roomCode.trim();

if(!room.roomCode || room.roomCode==="" || room.roomCode.toLowerCase()==="new" || room.roomCode.toLowerCase()==="join" ){
   res.status(401).send({status:false,message:"Invalid room code."});
   return;   
}
room["type"]=req.body.type.trim();
room["dp"]=req.body.dp?req.body.dp.trim(): "https://ik.imagekit.io/sbhtechhub/ssapplogo.png";

room["name"]=req.body.name.trim() || "matrices Sectret room"
if( ! room.type){
   res.status(401).send({status:false,message:"Invalid room type."});
   return;
}
if(room.type!=="public" && room.type!=="private"){
 res.status(401).send({status:false,message:"Invalid room type. "+room.type=="public"});
   return;   
}
if(room.type=="private"){
    if(req.body.password  && req.body.password.trim()!=="" ){
    room["password"]=await argon2.hash(req.body.password.trim(),{type:argon2.argon2id})
    }
    else{
        res.status(401).send({status:false,message:"Password is required."});
   return;
    }
    

}

funRoom.roomBox.set(room.roomCode,room);

res.status(200).send({status:true,roomCode:room.roomCode})


}

export default createFunRoom;