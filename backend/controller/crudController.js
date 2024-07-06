const express = require("express");

// const Repository = require("../repository/repository");
const initializeRepo = require("../middleware/repoMiddleware");

const controller = express.Router();

controller
  .use(initializeRepo)
  .post("/create", async (req, res) => {
    try {
      // const { name, age } = req.body;
      const create = await req.repo.create(req.body);
      if (!create || create === 0) {
        return res.status(400).json({
          error: "Couldn't create",
        });
      }
      return res.status(200).json({
        message: "Created Successfully",
      });
    } catch {
      res.status(500).json({
        error: "Server Error",
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

      const people_data = people.map((person) => ({
        name: person.name,
        age: person.age,
      }));

      return res.status(200).json(people_data);
    } catch {
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
  .put("/update/:id", async (req, res) => {
    try {
      const change = await req.repo.findOneAndUpdate(req.params.id, req.body);
      console.log(change);
      if (!change || change === 0) {
        return res.status(400).json({
          message: "Not Found",
        });
      }
      return res.status(200).json(change);
    } catch {
      res.status(404).json({
        message: "couldn't update",
      });
    }
  })
  .delete("/delete/:id", async (req, res) => {
    try {
      const person = await req.repo.deleteOne(req.params.id);
      if (!person || person === 0) {
        return res.status(404).json({
          message: "Not found",
        });
      }
      return res.status(200).json(person);
    } catch {
      res.status(500).json({
        error: "Server Error",
      });
    }
  });

module.exports = controller;
