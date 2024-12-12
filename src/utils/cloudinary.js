import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Set in your .env file
  api_key: process.env.CLOUDINARY_API_KEY, // Set in your .env file
  api_secret: process.env.CLOUDINARY_API_SECRET, // Set in your .env file
});

export default cloudinary;
