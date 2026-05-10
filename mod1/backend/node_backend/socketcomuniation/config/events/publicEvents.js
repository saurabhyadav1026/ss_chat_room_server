
import socketOperationSendMessage from "../../socketOperations/sendMessage.js";

// event declartion 

  const   publicEvents= {

"getFunChatRooms":(io,socket)=>( data={})=>socketOperationSendMessage(io,socket,data),

}

export default publicEvents;