import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';


// local storage configuration
/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req we are in multer storage.")
    console.log("file", file)
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"+file.originalname;
    console.log("filename", filename)
    cb(null, filename);
  }
}); */

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

  app.post('/uploads',upload.single('file'), async (req, res) => {
    // Handle the uploaded file here
  
    res.status(200).json({ message: 'File uploaded successfully' });
  });
