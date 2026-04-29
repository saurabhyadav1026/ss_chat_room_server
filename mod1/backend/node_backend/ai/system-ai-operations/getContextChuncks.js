



const getContextChuncks=(text,size=300)=>{

    // to break text in sentence
const sentences=splitIntoSentences(text)
    const chuncks=[];
    let cur="";
     
    // make sentence have max size= size  and add in chunks as chunk 
    for(let sentence of sentences){
        sentence=sentence.trim();
        if((cur+sentence).length>size){
            chuncks.push(cur);
        cur=sentence;
        }
        else cur+=" "+sentence

    }
    if(cur)chuncks.push(cur);


    
// to return the chunks
    return chuncks;
    

}
export default getContextChuncks; 



const splitIntoSentences=(text) =>{
  return text.match(/[^.!?]+[.!?]+/g) || [text];
}