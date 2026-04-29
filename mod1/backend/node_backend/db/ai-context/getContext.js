import Aicontext from "../db/models/ai_context_model.js";





const getContext=async (queryEmbedding,limit=3)=>{

   try{ const res= await Aicontext.aggregate(
        [
           { $vectorSearch:{
             index: "vector_index",
                queryVector:queryEmbedding,
                path:"embedding",
                limit:limit,
                 numCandidates: 50  
            }
        
        },
        {
            $project:{
                text:1
            }
        }
        
    
    ]
    )
return res;}
catch(e){
    console.log(e);
    return "";
}


}
export default getContext;




export const getContextWithScore=async (queryEmbedding,limit=3)=>{

  
    const res= await Aicontext.aggregate(
        [
           { $vectorSearch:{
             index: "vector_index",
                queryVector:queryEmbedding,
                path:"embedding",
                limit:limit,
                 numCandidates: 50  
            }
        
        },
        {
            $project:{
                text:1,
                score:{$meta:"vectorSearchScore"}
            }
        }
        
    
    ]
    )

return res

}


