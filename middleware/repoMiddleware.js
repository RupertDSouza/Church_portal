const Repository = require("../repository/repository");

// Middleware to initialize repo with req.model
const initializeRepo = (req, res, next) => {
  const model = req.model.manageModel;
  req.repo = new Repository(model); // Create repo instance
  next();
};

module.exports = initializeRepo;
