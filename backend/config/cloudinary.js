// backend/config/cloudinary.js
// Cloudinary setu
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzzwcqhe5",  
  api_key:    "531378814634361",    
  api_secret: "5L3sNfYwXhBpDcJC47MQxmiMuQg"   
});

module.exports = cloudinary;