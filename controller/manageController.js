const Manage = require("../models/manageModel");
// const model = require("../models/manageModel");

exports.getController = async (req, res) => {
  try {
    const people = await Manage.find();
    if (!people || people.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    console.log(">>>", people);
    const people_data = people.map((person) => ({
      name: person.name,
      age: person.age,
    }));

    res.status(200).json(people_data);
  } catch {
    res.status(400).json({
      error: "Couldn't fetch data",
    });
  }
};

exports.postController = async (req, res) => {
  const { name, age } = req.body;
  try {
    const people = new Manage({ name, age });
    await people.save();
  } catch {
    res.status(400).json({
      error: "Failed",
    });
  }
};

// exports.manageController = async (req, res) => {
//   try {
//     await res.status(200).json({
//       message: "IT WORKs",
//     });
//   } catch {
//     res.status(404).json({
//       message: "Not Found",
//     });
//   }
// };
