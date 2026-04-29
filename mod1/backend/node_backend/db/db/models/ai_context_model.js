import mongoose from "mongoose"; 


const schema=new mongoose.Schema({

    text:{type:String},
    embedding:{type:[Number]}

})

const Aicontext= mongoose.model("Aicontext",schema);
export default Aicontext;