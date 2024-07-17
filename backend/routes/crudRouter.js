const express = require("express");
const auth = require("../middleware/authMiddleware");
const { upload, fileUpload } = require("../middleware/uploadMiddleware");
const controller = require("../controller/crudController");

const router = express.Router();

router.post("/create", auth, upload, fileUpload, controller.create);

router.get("/read", controller.readAll);

router.get("/read/:id", controller.readOne);

router.put(
  "/update/:id",
  auth,
  (req, res, next) => {
    req.update = true;
    next();
  },
  upload,
  fileUpload,
  controller.update
);

router.delete("/delete/:id", auth, controller.delete);

module.exports = router;
