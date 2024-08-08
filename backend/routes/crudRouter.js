const express = require("express");
const multer = require("multer");
const auth = require("../middleware/authMiddleware");
const { uploadImage, fileUpload } = require("../middleware/uploadMiddleware");
const uploadToCloud = require("../middleware/uploadCloudMiddleware");
const controller = require("../controller/crudController");

const router = express.Router();
const upload = multer();

router.post("/create", auth, uploadImage, fileUpload, controller.create);

router.post(
  "/admission",
  upload.single("image"),
  uploadToCloud,
  controller.create
);

router.get("/read", controller.readAll);

router.get("/read/:id", controller.readOne);

router.put("/update/:id", upload.none(), auth, controller.update);

router.put(
  "/updateImage/:id",
  auth,
  uploadImage,
  fileUpload,
  controller.updateWithImage
);

router.put("/updateMass/:id", upload.none(), auth, controller.updateMass);

router.delete("/delete/:id", auth, controller.delete);

module.exports = router;
