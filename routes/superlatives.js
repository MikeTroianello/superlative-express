var express = require("express");
var router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Superlative = require("../models/Superlative");
const User = require("../models/User");

/* GET home page. */
router.post("/create/:userId", isLoggedIn, async (req, res) => {
  let superlative = await Superlative.create({
    content: req.body.content,
    creator: req.user._id,
  });

  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    { $push: { superlative: superlative } },
    { new: true }
  );

  res.json(updatedUser);
});

router.post("/vote/:userId/:superlativeId", isLoggedIn, async (req, res) => {
  let foundUser = await User.findById(req.params.userId).populate(
    "superlative"
  );

  let previouslyCreatedSuperlative = foundUser.superlative.find(
    (s) => s.vote === req.user._id
  );

  if (!previouslyCreatedSuperlative) {
    let votedUponSuperlative = await Superlative.findByIdAndUpdate(
      req.params.superlativeId,
      {
        $push: { vote: req.user._id },
      }
    );

    res.json(votedUponSuperlative);
  } else {
    res.status(400).json({ message: "You aleready voted" });
  }
});

module.exports = router;
