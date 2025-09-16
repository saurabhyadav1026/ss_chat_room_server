
import ImageKit from 'imagekit';
import dotenv from 'dotenv';
dotenv.config();



const MediaKit=new ImageKit({
    publicKey:process.env.MEDIA_PUBLIC_KEY,
    privateKey:process.env.MEDIA_PRIVATE_KEY,
    urlEndpoint:"https://ik.imagekit.io/sbhtechhub/sspapp"
});

export default MediaKit;