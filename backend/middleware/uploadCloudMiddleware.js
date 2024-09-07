const cloudinary = require("cloudinary");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
require("dotenv").config();

const tempDir = path.join(__dirname, "../../public/temp");

const upload = multer({
  dest: tempDir,
});

const uploadToCloud = async (req, res, next) => {
  // Configuration
  cloudinary.config({
    url: process.env.CLOUDINARY_URL,
  });

  const allowedExtensions = [".png", ".jpg", ".jpeg"];

  if (req.files) {
    for (const field in req.files) {
      for (let i = 0; i < req.files[field].length; i++) {
        const file = req.files[field][i];
        if (
          allowedExtensions.includes(
            path.extname(file.originalname).toLowerCase()
          )
        ) {
          try {
            // Upload an image
            const uploadResult = await cloudinary.uploader.upload(file.path);

            // Optimize delivery by resizing and applying auto-format and auto-quality
            const optimizeUrl = cloudinary.url(uploadResult.public_id, {
              transformation: [
                { width: 1000, crop: "scale" },
                { quality: 35 },
                { fetch_format: "auto" },
              ],
            });

            // Store the image URL with a unique name
            req.body[field] = optimizeUrl;

            // Delete the temporary file
            const filePath = path.join(tempDir, file.filename);
            console.log(`Attempting to delete: ${filePath}`);

            try {
              await Promise.race([
                fs.unlink(filePath),
                new Promise((_, reject) =>
                  setTimeout(
                    () => reject(new Error("File deletion timed out")),
                    5000
                  )
                ),
              ]);
              console.log(`Successfully deleted: ${filePath}`);
            } catch (unlinkError) {
              console.error(`Error deleting file: ${filePath}`, unlinkError);
              // Optionally, you can choose to continue despite the error
            }
          } catch (error) {
            return res.status(400).json({ Error: error });
          }
        } else {
          return res.status(403).json({
            error: "Only images are allowed!",
          });
        }
      }
    }
    next();
  } else {
    next();
  }
};

module.exports = {
  uploadImageCloudinary: upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gurkarImage", maxCount: 1 },
  ]),
  uploadToCloud,
};
