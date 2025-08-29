

/* 

ai chat :     sbhai1:{nae:"",res:[....],req:[....]}
friend chat:   usn:[{t:"",by:1|2,text:" "}]




*/


export const getName=(us)=>{
   const user=User.findOne({username:us})
 return user.name ;  
}
  


export const new_chat=(me,to)=>{

    if(to.includes('sbhai'))users[me]['chats'][to]={name:'AIChat'+to.slice(5,to.length),reqs:[],ress:[]}
    else if (users[me]['chats'][to]===null)users[me]['chats'][to]=[]
    
}




export const toSend=(me,to,txt)=>{
   
    users[me]['chats'][to].push({by:1,text:txt})
    if(users[to]['chats'][me]===null)users[to]['chats'][me]=[]
    users[to]['chats'][me].push({by:2,text:txt})

}



export const verifyUser=(u,p)=>{

if(users[u]['ps']===p)return true
else return false


}



export const getChatList=(u)=>{
const l=Object.keys(users[u]['chats'])
const chat_list=[]
for(let i=0;i<l.length;i++){
    let t={}
    if(l[i].includes('sbhai'))t={username:l[i], name:users[u]['chats'][l[i]]['name']};
   else t={username:l[i],name:users[l[i]]['name']}  
   chat_list.push(t)
}
return chat_list;
}


export const searchFriend=(activeUser,s_input)=>{

const l=Object.keys(users[activeUser]['chats'])
const chat_list=[]
for(let i=0;i<l.length;i++){
 
    if(l[i].includes(s_input)){
    let t={us:l[i],nm:users[l[i]]['name']};
   chat_list.push(t) 
   if(chat_list.length===5)break;
    }
}
return chat_list;    


}



export const getChat=(activeUser,active_chat)=>{
if(active_chat===null)return [];
    let c=[]
    if(active_chat.includes('sbhai')) {
let i=0;
        users[activeUser].chats[active_chat]['reqs'].forEach(element => {
            c.push({by:1,text:element},{by:2,text:users[activeUser].chats[active_chat]['ress'][i]})
            i++;
        });

    }
    else c=users[activeUser].chats[active_chat]; 
return  c;

}


export const sendToAI=(me,to,req)=>{
const res=get_res(req);
users[me]['chats'][to].reqs.push(req);
users[me]['chats'][to].ress.push(res);


}

export const sendToF=(me,to,txt)=>{
  const  t="23";

  users[me]['chats'][to].push({time:t,by:1,text:txt})  
  users[to]['chats'][me].push({time:t,by:2,text:txt})  
}
const get_res=(req)=>{
    return "sbh respose"
}



export const savedb=async()=>{
    const db= await connectDB();
    const userss=db.collection('users');
 await userss.insertOne({nam:'sbhydv'})
 return 'done'
    //return "GOOD BRO DDDDDDDDDDAAAAASDF" 

}
