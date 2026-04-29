import Aicontext from "../db/models/ai_context_model.js";





const addContext=async (text,embedding)=>{

   try{ 

    await Aicontext.create(
        {
            text,
        embedding
    }
    )
return true;
}
catch(e){
    console.log(e);
    return false;
}
}

export default addContext