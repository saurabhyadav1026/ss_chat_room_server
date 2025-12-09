

import {User} from '../../db/dbschema.js'













export const getUserInfo = async (username) => {

  let user = await User.findOne({ 'public_info.username': username });
  return user.public_info;

}




export const getChatsList = async (username) => {
  if (!username) return []
  let user = await User.findOne({ 'public_info.username': username });
  let chats_list = [];

  if (user.chats) {
    for (const u of Object.keys(user.chats)) {
      let x;
      if (u.slice(0, 5) === 'sbhai') x = { name: user.chats[u].name, username: u, unread: 0, dp: 'https://i.ibb.co/WpB24TDH/light-logo.png' }
      else {
        x = await getPublicInfo(u)
        x['unread'] = user.unread[u] || 0
      }
      chats_list.push(x)
    }

    if (user.unread) {
      let unread_chat = user.unread

      Object.keys(unread_chat).forEach((x) => {
        if (username !== x && unread_chat[x] !== 0) doDoubleTick(username, x);    // to double tick the msg
      });
    }

  }
  return chats_list;

}

export const getName = async (username) => {
  let name = await User.findOne({ 'public_info.username': username }, { 'public_info.name': 1 });
  return name;
}


const getPublicInfo = async (username) => {
  let user = await User.findOne({ 'public_info.username': username }, { public_info: 1 });
  return user.public_info;
}





export const getsearchList = async (search_input) => {


  let search_list = [];
  let user_list = await User.find({}, { public_info: 1, _id: 0 });

  user_list.forEach((u) => {


    if (u.public_info.username.toLowerCase().includes(search_input.toLowerCase()) || u.public_info.name.toLowerCase().includes(search_input.toLowerCase())) search_list.push(u.public_info);
    if (search_list.length > 10) c;
  })


  return search_list;

}



export const getChat = async (activeuser, chatuser) => {

  if (!chatuser) return []
  let chat = [];
  try {
    let user = await User.findOne({ 'public_info.username': activeuser }, { chats: 1, unread: 1 });

    if (chatuser.slice(0, 5) === 'sbhai') {
      user.chats[chatuser].reqs.forEach((r, i) => {
        let rr = user.chats[chatuser]['ress'][i]
        chat.push({ time: "", by: 1, text: r }, { by: 2, text: rr })

      });

      return chat
    }

    else if (user.chats[chatuser]) {

      chat = user.chats[chatuser].chat

      if (user.unread && user.unread[chatuser] && user.unread[chatuser] > 0) {
        let unread_ = user.unread;
        unread_[chatuser] = 0;
        doBlueTick(activeuser, chatuser);  // to do blue tick the msg
        await User.updateOne({ 'public_info.username': activeuser }, { $set: { unread: unread_ } })
      }

      return chat;
    }
  }
  catch { }

  return chat;
}





export const sendMsg = async (activeuser, chatuser, senderCopy, recieverCopy) => {


  const user1 = await User.findOne({ "public_info.username": activeuser })

  if (!user1['chats']) user1['chats'] = {}
  let c1 = user1['chats'];
  if (c1[chatuser]) c1[chatuser].chat.push({ time: getTime(), by: 1, text: senderCopy, status: 1 });


  else {
    // create session
   // socket.emit("createSession", activeuser, chatuser);

    // send msg
    c1[chatuser] = {
      chat: [{ time: getTime(), by: 1, text: senderCopy, status: 1 }],
      chat_setting: getDefaultChatSetting()
    }
  }
  await User.updateOne({ "public_info.username": activeuser }, { $set: { chats: c1 } })

  // if it is not a self msg
  if (!(activeuser === chatuser)) {
    const user2 = await User.findOne({ 'public_info.username': chatuser })
    if (!user2.chats) user2['chats'] = {}
    let c2 = user2.chats;
    if (!c2[activeuser]) {
      c2[activeuser] = { chat_setting: getDefaultChatSetting(), chat: [{ time: getTime(), by: 2, text: recieverCopy }] }

    }
    else c2[activeuser].chat.push({ time: getTime(), by: 2, text: recieverCopy });

    if (!user2['unread']) user2['unread'] = {}
    let un_read = user2['unread'];
    if (un_read[activeuser]) un_read[activeuser] = un_read[activeuser] + 1
    else un_read[activeuser] = 1;


    await User.updateOne({ "public_info.username": chatuser }, { $set: { chats: c2, unread: un_read } })

//doreloade(user1.username,user2.username)
  }




}


const getTime = () => {
  const now = new Date();
  let datetime = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return datetime;
}


const getDefaultChatSetting = () => {
  return {}
}         



const doBlueTick = async (A, x) => {
  let chats = await User.findOne({ 'public_info.username': x }, { chats: 1, _id: 0 })
  chats = chats.chats;

  let chat = chats[A].chat;
  for (let i = (chat.length) - 1; i >= 0; i--) {
    if (chat[i].by === 2) continue;
    else if (chat[i].by === 1 && chat[i].status < 3) {
      chat[i].status = 3;
    }
    else break;
  }
  chats[A].chat = chat;
  await User.updateOne({ 'public_info.username': x }, { $set: { chats: chats } })
 // doreloade(A, x);
}



const doDoubleTick = async (A, x) => {

  let chats = await User.findOne({ 'public_info.username': x }, { chats: 1, _id: 0 })
  chats = chats.chats;
if(!chats[A])return;
  if (!chats[A].chat) return;
  let chat = chats[A].chat;
  for (let i = (chat.length) - 1; i >= 0; i--) {
    if (chat[i].by === 2) continue;
    else if (chat[i].by === 1 && chat[i].status < 2) {
      chat[i].status = 2;
    }
    else break;
  }
  chats[A].chat = chat;
  await User.updateOne({ 'public_info.username': x }, { $set: { chats: chats } })
  //doreloade(A, x);

}
