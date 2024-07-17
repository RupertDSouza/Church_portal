const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
require("dotenv").config();

const secretKey = process.env.SECRECT_KEY;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await req.repo.find(email);

    if (!users) {
      res.status(401).json({
        message: "Invalid User",
      });
    }
    const user = users[0];

    const isPasswordVaild = await bcrypt.compare(password, user.password);

    if (!isPasswordVaild) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};
