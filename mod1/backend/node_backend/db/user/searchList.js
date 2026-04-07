
import  User  from "../db/models/user_model.js";


const getSearchList = async (search_input) => {
    if(search_input=="")return [];

    let list = [];

    list = await User.aggregate([
        {
            $match: {
                $or: [
                    { "public_info.username": { $regex: search_input, $options: "i" } },
                    { "public_info.name": { $regex: search_input, $options: "i" } }
                ]
            },
        },
        {
            $limit:5
        },
        {
            $project: {
                name: "$public_info.name",
                username: "$public_info.username",
                dp: "$public_info.dp",
                _id: 1
            }
        }
    ])
const slist={}
  for( const x of list){
    slist[x._id]=x;
  }
    return slist;
}


export default getSearchList;