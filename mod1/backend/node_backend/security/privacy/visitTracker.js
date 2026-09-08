import Deviceinfo from "../../db/db/models/deviceinfo.js";
import jwt from "jsonwebtoken";


const visitTracker = async (req, res) => {

    const deviceId = req.query.deviceId;

  





    //const geoInfo=await (await fetch(`https://free.freeipapi.com/api/json/${ip}`)).json();


    let userId = null;


    if (req.cookies.refreshToken) {

        jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                console.err(error)
            }
            else {

                userId = decoded.payload._id;
            }
        })

    }


    const info = {

        userId,
        ip: req.headers['x-forward-for'] || req.socket.remoteAddress,
        latitude:req.query.latitude | "" ,
        longitude:req.query.longitude || "" ,
        device : req.headers["user-agent"]
    }

    

    if (deviceId !== "") {
        
        try {
            await Deviceinfo.updateOne({ _id: deviceId }, { $push: { info: info } })
            res.send({ status: true, newDevice: false })
        } catch (err) {
            res.send({ status: false, newDevice: false })
            console.error("visit error  : "+ err)
        }


    }
    else {

        const device = await Deviceinfo.create({ info: [info] })
        res.status(200).send({ status: true, newDevice: true, deviceId: device._id })

    }





}

export default visitTracker;