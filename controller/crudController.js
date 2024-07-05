const express = require("express");

const Repository = require("../repository/repository");

const contoller = express.Router();

contoller
  .post("/post", async (req, res) => {
    const model = req.model.manageModel;
    const repo = new Repository(model);
    try {
      const { name, age } = req.body;
      const create = await repo.create({ name, age });
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

  .get("/get", async (req, res) => {
    const repo = new Repository(req.model);
    try {
      const people = await repo.find();
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
// router.use("/get/:id", readOne);
// router.use("/put/:id", update);
// router.use("/delete/:id", deleteOne);

module.exports = contoller;
