import mongoose from "mongoose";
import Chat_Room from "../db/models/chat_room_model.js";





const createChatRoom = async (members) => {



    try {
       
        let id;
        if (members[0] !== members[1]) {
            const { _id } = await Chat_Room.findOneAndUpdate(
                { members: members },
                { $setOnInsert: { members: members } }, { new: true, upsert: true }
            )
            id=_id;
        }
        else{
 const { _id } = await Chat_Room.findOneAndUpdate(
                { members: members },
                { $setOnInsert: {roomType:"my", members: members } }, { new: true, upsert: true }
            )
            id=_id;

        }

        return { status: true, _id: _id };
    } catch (err) {
        console.log(err);
        return { status: false }
    }

}
export default createChatRoom;