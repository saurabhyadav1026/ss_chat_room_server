import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';



//cloudinary storage configuration


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Specify the folder in Cloudinary where files will be stored
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Specify allowed file formats
  },
});


const upload = multer({ storage: storage });



export default upload;   


export const uploadeDPByImageUrl=async (userId,url)=>{

  try{
  const result = await cloudinary.uploader.upload(url, {
    folder: "users_dp",
    public_id: `user_${userId}`,
       overwrite: true,
  });
  return result.secure_url;
}
catch(err){
  console.error(err);
  return null;
}
}
