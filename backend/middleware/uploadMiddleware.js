const multer = require("multer");
const path = require("path");
const fs = require("fs");

const handleError = (err, res) => {
  return res.status(500).json({
    error: err,
  });
};

const upload = multer({
  dest: path.join(__dirname, "../../public/temp"),
});

const fileUpload = (req, res, next) => {
  const fileFields = Object.keys(req.files || {});
  if (fileFields.length > 0) {
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
    const processedFiles = {};

    const processFile = (fieldName, file, callback) => {
      const tempPath = file.path;
      const originalName = file.originalname;
      const targetPath = path.join(
        __dirname,
        `../../public/uploads/${originalName}`
      );

      if (
        allowedExtensions.includes(path.extname(originalName).toLowerCase())
      ) {
        fs.rename(tempPath, targetPath, (err) => {
          if (err) return callback(err);
          processedFiles[
            fieldName
          ] = `../../Church_portal/public/uploads/${originalName}`;
          callback(null);
        });
      } else {
        fs.unlink(tempPath, (err) => {
          if (err) return callback(err);
          callback(
            new Error(
              `Only images with extensions ${allowedExtensions.join(
                ", "
              )} are allowed.`
            )
          );
        });
      }
    };

    const processFiles = (index) => {
      if (index >= fileFields.length) {
        // Assign processed files to req.body
        Object.assign(req.body, processedFiles);
        next();
        return;
      }

      const fieldName = fileFields[index];
      const file = req.files[fieldName][0]; // We're only processing one file per field

      processFile(fieldName, file, (err) => {
        if (err) {
          return handleError(err, res);
        }
        processFiles(index + 1);
      });
    };

    processFiles(0);
  } else {
    next();
  }
};

module.exports = {
  uploadImage: upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gurkarImage", maxCount: 1 },
  ]),
  fileUpload,
};
