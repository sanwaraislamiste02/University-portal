// Multer handles file uploads
// multer-storage-cloudinary for sending the file directly to cloudinary
const multer   = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:         "university-portal",  // folder name in cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill" }]
  }
});

module.exports = multer({ storage });