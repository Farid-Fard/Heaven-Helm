// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'djdiq0oku',
//   api_key: '553462124568962',
//   api_secret: 'vwlEJQUBzFYfDk9KpUipNP0JKQI',
// });

// // Set up multer storage for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'your-folder-name', // Specify a folder name for the uploaded images
//     allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed formats
//   },
// });

// // Middleware to handle image uploads
// const upload = multer({ storage });

// module.exports = { upload, cloudinary };
