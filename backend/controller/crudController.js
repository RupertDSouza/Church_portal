const fs = require("fs");
const { promisify } = require("util");

exports.create = async (req, res) => {
  try {
    if (req.access !== "student" && !req.access.includes(req.accessRole)) {
      return res.status(401).json({
        message: "Not allowed, Check Role",
      });
    }
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
    let people;
    if (req.query.q) {
      people = await req.repo.find(req.query.q);
    } else {
      people = await req.repo.find();
    }

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
    const change = await req.repo.findOneAndUpdate(req.params.id, req.body);

    if (!change || change === 0) {
      return res.status(400).json({
        message: "Not Found",
      });
    }
    return res.status(200).json({
      change,
      message: "Success",
    });
  } catch (error) {
    res.status(404).json({
      message: "couldn't update",
    });
  }
};

exports.updateWithImage = async (req, res) => {
  try {
    const old = await req.repo.findById(req.params.id);
    const change = await req.repo.findOneAndUpdate(req.params.id, req.body);

    if (!change || change === 0) {
      return res.status(400).json({
        message: "Not Found",
      });
    }

    if (change.image) {
      if (change.image !== old.image && old.image != null) {
        const accessAsync = promisify(fs.access);
        const unlinkAsync = promisify(fs.unlink);
        try {
          accessAsync(person.image);
          unlinkAsync(person.image);
        } catch (unlinkError) {
          console.error("Error deleting image file:", unlinkError);
        }
      }
    }
    return res.status(200).json({
      change,
      message: "Success",
    });
  } catch (error) {
    res.status(404).json({
      message: "couldn't update",
    });
  }
};

exports.updateMass = async (req, res) => {
  try {
    const { about } = req.body;
    const id = req.body.info[0]._id;

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

    const change = await req.repo.findOneAndUpdate(
      req.params.id,
      { $set: updates },
      {
        arrayFilters: [{ "elem._id": id }],
        new: true,
      }
    );

    if (!change || change === 0) {
      return res.status(400).json({
        message: "Not Found",
      });
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

exports.delete = async (req, res) => {
  try {
    const accessAsync = promisify(fs.access);
    const unlinkAsync = promisify(fs.unlink);
    const person = await req.repo.findOneAndDelete(req.params.id);
    if (!person || person === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    if (person.image) {
      try {
        accessAsync(person.image);
        unlinkAsync(person.image);
      } catch (unlinkError) {
        console.error("Error deleting image file:", unlinkError);
      }
    }
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

// exports.update = async (req, res) => {
//   try {
//     let change;
//     if (req.mass) {
//       console.log(req.body.about[0]._id);
//       const { about } = req.body;
//       const id = req.body.about[0]._id;

//       const updates = {};
//       about.forEach((item) => {
//         if (item.occasion) {
//           updates[`about.$[elem].occasion`] = item.occasion;
//         }
//         if (item.date) {
//           updates[`about.$[elem].date`] = item.date;
//         }
//         if (item.time) {
//           updates[`about.$[elem].time`] = item.time;
//         }
//       });

//       change = await req.repo.findOneAndUpdate(
//         req.params.id,
//         { $set: updates },
//         {
//           arrayFilters: [{ "elem._id": id }],
//           new: true,
//         }
//       );
//     } else {
//       change = await req.repo.findOneAndUpdate(req.params.id, req.body);
//     }

//     if (!change || change === 0) {
//       return res.status(400).json({
//         message: "Not Found",
//       });
//     }

//     if (change.image) {
//       const old = await req.repo.findById(req.params.id);
//       if (change.image !== old.image && old.image != null) {
//         const unlinkAsync = promisify(fs.unlink);
//         unlinkAsync(old.image);
//       }
//     }

//     return res.status(200).json({
//       data: { change },
//       message: "Success",
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: "couldn't update",
//     });
//   }
// };
