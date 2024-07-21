const express = require("express");
const fs = require("fs");
const { promisify } = require("util");

const router = express.Router();

exports.create = async (req, res) => {
  try {
    if (!req.access.includes(req.accessRole))
      return res.status(401).json({
        message: "Not allowed, Check Role",
      });
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
};

exports.readAll = async (req, res) => {
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
};

exports.readOne = async (req, res) => {
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
};

exports.update = async (req, res) => {
  try {
    let change;
    if (req.mass) {
      console.log(req.body.about[0]._id);
      const { about } = req.body;
      const id = req.body.about[0]._id;

      const updates = {};
      about.forEach((item) => {
        if (item.occasion) {
          updates[`about.$[elem].occasion`] = item.occasion;
        }
        if (item.date) {
          updates[`about.$[elem].date`] = item.date;
        }
        if (item.time) {
          updates[`about.$[elem].time`] = item.time;
        }
      });

      change = await req.repo.findOneAndUpdate(
        req.params.id,
        { $set: updates },
        {
          arrayFilters: [{ "elem._id": id }],
          new: true,
        }
      );
    } else {
      change = await req.repo.findOneAndUpdate(req.params.id, req.body);
    }

    if (!change || change === 0) {
      return res.status(400).json({
        message: "Not Found",
      });
    }

    if (change.image) {
      const old = await req.repo.findById(req.params.id);
      if (change.image !== old.image && old.image != null) {
        const unlinkAsync = promisify(fs.unlink);
        unlinkAsync(old.image);
      }
    }

    return res.status(200).json({
      data: { change },
      message: "Success",
    });
  } catch (error) {
    res.status(404).json({
      message: "couldn't update",
    });
  }
};

exports.updateMass = async (req, res) => {
  const { id } = req.params;
  const { about } = req.body;

  if (!about || !Array.isArray(about)) {
    return res
      .status(400)
      .send({ error: 'Invalid request. "about" must be an array.' });
  }

  // try {
  const updates = {};

  // Construct the updates object dynamically
  about.forEach((item) => {
    const aboutId = item._id;
    if (item.occasion) {
      updates[`about.$[elem].occasion`] = item.occasion;
    }
    if (item.date) {
      updates[`about.$[elem].date`] = item.date;
    }
    if (item.time) {
      updates[`about.$[elem].time`] = item.time;
    }
  });

  const updatedMass = await req.repo.findOneAndUpdate(
    { _id: id },
    { $set: updates },
    {
      arrayFilters: [{ "elem._id": { $in: about.map((item) => item._id) } }],
    }
  );

  return res.status(200).send(updatedMass);
  // } catch (error) {
  //   res.status(400).send(error);
  // }
};

exports.delete = async (req, res) => {
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
};
