
import User ,{User_list} from './dbschema.js'

import newUser from '../new_user.js';



class Profile{

constructor (username,password,token_no){
    if(Profile.isUsernameAvailable(username)){
    this.username=username;
    this.token_no='token_no';
}
}


static isUsernameAvailable=async(new_username)=>{
    let value=true;
      if (username.includes('sbhai') || username === 'sbhunk')value=false;
      else {
        let users = await User_list.find();
        for (let i = 0; i < users.length; i++) {
        if (users[i].username === username ){
          value = false;
          break;
        }
      }}
      return value;

}

static logginUser=async(username,password)=>{
    let log_info={status:false}
 let user=await User.findOne({'public_info.username':username})
  if(user.personal_info.password&&user.personal_info.password===password){
    log_info=user.public_info;
    new_token=generateLogginToken();
    log_info['newToken']=new_token;
    User.personal_info.active_tokens.push(new_token)
    await User.updateOne({'public_info.username':req.query.username},{$set:{'personal_info.active_tokens':user.personal_info.active_tokens}})
    res.json({value:log_info})
  }
return log_info;
}


static registerUser=async(name,username,password,email)=>{

 let log_info={status:false}
 try{await newUser(name,username,password,email);
  log_info.status=true;
 }catch{}
return log_info;

}


static checkLogginStatus=(token_no,username)=>{
let status=false;

let user=User.findOne({'public_info.username':username})
if(user.personal_info.active_tokens.includes(token_no))status=true;

status=false  // fetch is Loggin(token_no,username)

}


editName=(token_no,username,new_name)=>{
  if(!Profile.checkLogginStatus())return false;
  

}  
editUsername=(new_username)=>{

}  
editAbout=(new_about)=>{
    
}
editDp=(new_dp)=>{

}

editPassword=(old_password,new_password)=>{

}












}