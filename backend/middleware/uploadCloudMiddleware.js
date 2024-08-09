const cloudinary = require("cloudinary");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const upload = multer({
  dest: path.join(__dirname, "../../public/temp"),
});

const uploadToCloud = async (req, res, next) => {
  // Configuration
  cloudinary.config({
    url: process.env.CLOUDINARY_URL,
  });

  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  if (req.file) {
    if (
      allowedExtensions.includes(
        path.extname(req.file.originalname).toLowerCase()
      )
    ) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path)
        .catch((error) => {
          return res.status(400).json({ Error: error });
        });

      // Optimize delivery by resizing and applying auto-format and auto-quality
      const optimizeUrl = cloudinary.url(uploadResult.public_id, {
        transformation: [
          { width: 1000, crop: "scale" },
          { quality: 35 },
          { fetch_format: "auto" },
        ],
      });
      req.body.image = optimizeUrl;
      next();
    } else {
      return res.status(403).json({
        error: "Only images are allowed!",
      });
    }
  } else {
    req.body.image = null;
    next();
  }
};

module.exports = {
  uploadImageCloudinary: upload.single("image"),
  uploadToCloud,
};
