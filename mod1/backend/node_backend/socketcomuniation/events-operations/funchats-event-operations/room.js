



class randomBox {
  static  map = new Map();
    static que=[]

    match(socket){
this.que.push(socket.id);
    }

}

const roomBox=new Map();
const randomChat= new randomBox();
const joinedRoom= new Map();


const funRoom ={
    randomChat,
    roomBox,
    joinedRoom
    
}

export default funRoom;