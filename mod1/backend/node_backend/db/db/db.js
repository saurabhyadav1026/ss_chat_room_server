
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch{}
};

export default connectDB;



export const toObjId=(_id)=>{
  return  new mongoose.Types.ObjectId(_id);
}