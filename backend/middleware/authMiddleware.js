const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const secretKey = process.env.SECRECT_KEY;

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. No token provided",
    });
  }
  const token = authHeader.substring(7);

  if (!token)
    return res.status(401).json({
      message: "Access denied. No token provided",
    });

  try {
    const decode = jwt.verify(token, secretKey);
    req.userId = decode.userId;
    const filter = { _id: decode.userId };
    const user = await User.findById(filter);
    req.accessRole = user.role;

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invlid Token",
    });
  }
};

module.exports = auth;
