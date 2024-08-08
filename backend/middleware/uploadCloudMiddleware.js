const cloudinary = require("cloudinary");
require("dotenv").config();

const uploadToCloud = async (req, res, next) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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
        .upload(req.file.path, {
          public_id: req.file.originalname,
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(uploadResult);

      // Optimize delivery by resizing and applying auto-format and auto-quality
      const optimizeUrl = cloudinary.image(req.file.originalname, {
        transformation: [
          { width: 1000, crop: "scale" },
          { quality: 35 },
          { fetch_format: "auto" },
        ],
      });

      console.log(optimizeUrl);
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

module.exports = uploadToCloud;
