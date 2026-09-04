import multer from 'multer';
import cloudinary from './cloudinary.js';
import streamifier from "streamifier";


//cloudinary storage configuration





const upload = multer({ storage: multer.memoryStorage() });



export default upload;   


export const uploadeDPByImageUrl=async (userId,url)=>{

  try{
  const result = await cloudinary.uploader.upload(url, {
    folder: "users_dp",
    public_id: `user_${userId}`,
       overwrite: true,
          allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Specify allowed file formats
  });
  return result.secure_url;
}
catch(err){
  console.error(err);
  return null;
}
}

export const uploadeDPByImageFile=async(userId,file)=>{
  
  try{
     const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { 
 folder: "users_dp",
    public_id: `user_${userId}`,
       overwrite: true,
   allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Specify allowed file formats
         },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });

  return result.secure_url;
}
catch(err){
  console.error(err);
  return null;
}
}




/**
 * @swagger
 * /uploads:
 *   post:
 *     summary: Upload a file
 *     tags:
 *       - Uploads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
/* 
  app.post('/uploads',upload.single('file'), async (req, res) => {
    // Handle the uploaded file here
  
    res.status(200).json({ message: 'File uploaded successfully' });
  });
 */