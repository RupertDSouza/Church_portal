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
  if (req.file) {
    const tempPath = req.file.path;
    const targetPath = path.join(
      __dirname,
      `../../public/uploads/${req.file.originalname}`
    );

    const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
    if (
      allowedExtensions.includes(
        path.extname(req.file.originalname).toLowerCase()
      )
    ) {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
        req.body.image = `../../public/uploads/${req.file.originalname}`;
        next();
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);
        return res.status(403).json({
          error: "Only .png files are allowed!",
        });
      });
    }
  } else {
    req.body.image = null;
    next();
  }
};

module.exports = {
  upload: upload.single("image"),
  fileUpload,
};
