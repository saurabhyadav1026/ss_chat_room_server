import Aimessage from "../models/ai_message_model.js"



const getMessages=async(roomId)=>{
try{
    const messages=await Aimessage.find({roomId:roomId});
    const msgs={};
    messages.forEach(msg => {
        msgs[msg._id]=msg;
    });

    return {status:true,messages:msgs}
}catch(err){
    console.log(err)
}

}

export default getMessages;