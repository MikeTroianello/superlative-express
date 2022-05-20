var express = require("express");
var router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv/config");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res) => {
  try {
    let user = await User.create({
      name: req.body.name,
    });

    const payload = { ...user };

    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "24hr",
    });

    res.json(token);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.create({
      name: req.body.name,
    });
    const payload = { ...user };

    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "24hr",
    });

    res.json(token);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/all-other-users", async (req, res) => {
  try {
    let users = await User.find();

    let notYou = users.filter((user) => {
      return user._id !== req.user._id;
    });

    res.json(notYou);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
