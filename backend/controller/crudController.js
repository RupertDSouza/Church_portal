const fs = require("fs");
const { promisify } = require("util");
const cloudinary = require("cloudinary").v2;

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
    let response;
    if (req.query.q) {
      response = await req.repo.find(req.query.q);
    } else {
      response = await req.repo.find();
    }

    if (!response || response.length === 0) {
      return res.status(400).json({
        message: "Not found",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      error: "Couldn't fetch data",
    });
  }
};

exports.readOne = async (req, res) => {
  try {
    const response = await req.repo.findById(req.params.id);
    if (!response || response === 0) {
      return res.status(400).json({
        message: "Not found",
      });
    }

    return res.status(200).json(response);
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
    return res.status(404).json({
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
        try {
          const publicId = extractPublicIdFromUrl(old.image);
          await cloudinary.uploader.destroy(publicId).catch((error) => {
            return res.status(400).json({ Error: error });
          });
        } catch (extractionError) {
          return res
            .status(400)
            .error({ "Error extracting public ID": extractionError });
        }
      }
    }
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    return res.status(404).json({
      message: "couldn't update",
    });
  }
};

exports.updateServerImage = async (req, res) => {
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
          await accessAsync(old.image);
          await unlinkAsync(old.image);
        } catch (unlinkError) {
          return res.status(400).json({ Error: unlinkError });
        }
      }
    }
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    return res.status(404).json({
      message: "couldn't update",
    });
  }
};

exports.updateMass = async (req, res) => {
  try {
    const { masses } = req.body;

    if (!Array.isArray(masses)) {
      return res.status(400).json({ message: "masses[] array is required" });
    }

    // req.params.id = _id of the specific day document (e.g. Sunday's doc)
    const dayDoc = await req.repo.findById(req.params.id);
    if (!dayDoc) {
      return res.status(404).json({ message: "Day not found" });
    }

    dayDoc.masses = masses;
    await dayDoc.save();

    return res.status(200).json({ message: "Updated successfully", data: dayDoc });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't update", error });
  }
};

exports.delete = async (req, res) => {
  try {
    const accessAsync = promisify(fs.access);
    const unlinkAsync = promisify(fs.unlink);
    const response = await req.repo.findOneAndDelete(req.params.id);

    if (!response || response === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    if (response.image) {
      try {
        await accessAsync(response.image);
        await unlinkAsync(response.image);
      } catch {
        try {
          const publicId = extractPublicIdFromUrl(response.image);
          await cloudinary.uploader.destroy(publicId).catch((error) => {
            return res.status(400).json({ Error: error });
          });
        } catch (extractionError) {
          return res
            .status(400)
            .error({ "Error extracting public ID": extractionError });
        }
      }
    }

    return res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

function extractPublicIdFromUrl(url) {
  const regex = /\/([^/]+?)(?:\?|$)/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error("Could not extract public ID from the URL");
  }
}
