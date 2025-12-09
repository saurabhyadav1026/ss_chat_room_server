
import { User } from "../dbschema.js";


const getSearchList = async (search_input) => {

    console.log(search_input);

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
            $project: {
                name: "$public_info.name",
                username: "$public_info.username",
                dp: "$public_info.dp",
                _id: 1
            }
        }
    ])

  
    return list;
}


export default getSearchList;