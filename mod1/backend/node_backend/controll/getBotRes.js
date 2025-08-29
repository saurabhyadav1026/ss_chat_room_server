

import requestes from '../training/t1.js';
 
 
 
 
 
 
 const getBotRes = (reqS) => {
     const   req=reqS.split(" ");                                   // req= input split list  
     const  t = []                                 // list to store  match counts of key in reuests list
   
   for (let i = 0; i < requestes.length; i++) {        // loop for reuests list
         t[i] = 0;
         req.forEach(r => {
             if (requestes[i].reqs.includes(r))               // to match with req key list
                 t[i]++;
         });
         if (t[i] === req.length)return requestes[i].res;    // for exact match
     }
     let max=0;
     for (let i=0;i<t.length;i++){
         if(t[i]>t[max])max=i;               // to find the max matching index of requests list
     }
     return requestes[max].res;          // to return the response having  max matching 
 
 }

export default getBotRes;