const express = require("express");
const initializeRepo = require("../middleware/repoMiddleware");
const { upload, fileUpload } = require("../middleware/uploadMiddleware");
const fs = require("fs");
const { promisify } = require("util");

const controller = express.Router();

controller
  .use(initializeRepo)
  .post("/create", upload, fileUpload, async (req, res) => {
    try {
      const create = await req.repo.create(req.body);
      if (!create || create === 0) {
        return res.status(400).json({
          error: "Couldn't create",
        });
      }
      return res.status(200).json({
        message: "Created Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  })

  .get("/read", async (req, res) => {
    try {
      const people = await req.repo.find();
      if (!people || people.length === 0) {
        return res.status(400).json({
          message: "Not found",
        });
      }

      return res.status(200).json(people);
    } catch (error) {
      return res.status(404).json({
        error: "Couldn't fetch data",
      });
    }
  });
controller
  .get("/read/:id", async (req, res) => {
    try {
      const person = await req.repo.findById(req.params.id);
      if (!person || person === 0) {
        return res.status(400).json({
          message: "Not found",
        });
      }
      return res.status(200).json(person);
    } catch {
      return res.status(404).json({
        error: "Couldn't fetch data",
      });
    }
  })
  .put("/update/:id", upload, fileUpload, async (req, res) => {
    try {
      const change = await req.repo.findOneAndUpdate(req.params.id, req.body);
      console.log(change);
      if (!change || change === 0) {
        return res.status(400).json({
          message: "Not Found",
        });
      }
      return res.status(200).json(change);
    } catch (error) {
      res.status(404).json({
        message: "couldn't update",
      });
    }
  })
  .delete("/delete/:id", async (req, res) => {
    try {
      const unlinkAsync = promisify(fs.unlink);
      const person = await req.repo.findOneAndDelete(req.params.id);
      if (!person || person === 0) {
        return res.status(404).json({
          message: "Not found",
        });
      }
      if (person.image) unlinkAsync(person.image);
      return res.status(200).json({
        data: { person },
        message: "Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  });

module.exports = controller;
