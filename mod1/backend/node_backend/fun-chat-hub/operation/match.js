

const members={
/* 
sbh:{status:false},
hhu:{status:false} */

}





const match =(me)=>{
let room = {}
    let match=false;
    members[me]={status:false};

    while( !match){

if(members[me].status){
members[me].room.req=1;          // to accept match request
  console.log("we accept req for matchhhh 1")
while(members[you].room.req==1) {}          // to wait for match Acknowledgement
if(members[you].room.req==2) {    // on sucess of match

room=members[you].room.room;            // to set updated room
    match = true;
}
else{
members[me]={status:false};         // on unsuccess of match , loop will continue

}
}
else{



const you=selectMember(me);
console.log("the you is    :  "+ you)
if(members[you]){
    members[you].status=true;
    members[you].room={req:0};                    // to send match req
    console.log("we send req for matchhhh 0")
    while(members[you].room.req==0){};          // wait for response
    if(members[you].room.req==1){                   // if requested accepted
room=createRoom(me,you);                         // to create room
        members[you].room.room=room;
members[you].room.req=2;                               // for  match accepted ack

match=true;

    }}
            // if not accepted loop will continue
}



    }


    return match;

}

export default match;


const selectMember=(me)=>{
for (let x of Object.keys(members)){
    if(x!==me){
        console.log(me)
        console.log("we get "+x)
        return x;}
        else{
            console.log("er not het "+x)
        }
}

}

const createRoom=(me,you)=>{

}