

import User ,{User_list} from './dbschema.js'










export const getUserInfo=async(username)=>{

    let user=await User.find({public_info:{username:username}});
    return user.public_info;

}




export const chatList=async()=>{


    let user=await User.find({public_info:{username:username}});
    let chats=Object.keys(user.chats);
    let chats_list=[]
    chats.forEach(async(u)=>{
        chats_list.push({username:u,name:await getname(u),unread:user.unread.u});
    })
    return user.public_info;

}

const getname=async(username)=>{
    let user=await User_list.find({username:username});
    return user.name;
}




export const getsearchList=async(username,search_input)=>{

    let search_list=[];
    

    let chats_list=await chatList(username);
    chats_list.forEach((u)=>{
        if(u.username.includes(search_input)||u.name.includes(search_input))search_list.push(u);
    })
    
    let user_list=await User_list.find();
    user_list.forEach((u)=>{
        if(u.username.includes(search_input)||u.name.includes(search_input))search_list.push(u);
    })


    return search_list;

}



export const getChat=async(activeuser,chatuser)=>{

    let user=await User.find({public_info:{username:activeuser}});
    return user.chats[chatuser].chat
    
}





export const sendMsg=async(activeuser,chatuser,text)=>{


 const user1 = await User.findOne({public_info:{ username: activeuser }})
  let c1 = user1['chats'];
  if(c1[req.query.activechat])c1[activechat].chat.push({ time:getTime(), by: 1, text: req.query.text, status: 1 });
 
 
  else {c1[req.query.activechat]={chat:[{ time: getTime(), by: 1, text: req.query.text, status:1 }],
chat_setting:getDefaultChatSetting()}
 }
  await User.updateOne({public_info:{ username: req.query.activeuser }}, { $set: { chats: c1 } })
  
  // if it is not a self msg
  if (!(req.query.activeuser === req.query.activechat)) {
    const user2 = await User.findOne({public_info: {username:chatuser }})
    let c2 = user2.chats;
    if (!user2.chats[activeuser].chat) {c2[activeuser]={chat: [{ time: getTime(), by: 2, text: req.query.text }],
chat_setting:getDefaultChatSetting()}
    }
    else c2[activeuser].chat.push({ time: getTime(), by: 2, text: req.query.text });
  

    let un_read=user2['unread'];
    if(un_read[req.query.activeuser]) un_read[req.query.activeuser] =un_read[req.query.activeuser] +1
    else un_read[req.query.activeuser]=1;

    await User.updateOne({public_info:{ username: activechat }}, { $set: { chats: c2, isReloade: true, unread:un_read} })

  }
  res.json({ value: "done" })



}


const getTime=()=>{
  const now=new Date();
  let t=now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit',second:'2-digit' });
  return t;
}