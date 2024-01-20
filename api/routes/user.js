const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const verify = require("./verifyToken");
const saltRounds = 10;

// update
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = bcrypt.hash(req.body.password, saltRounds);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(403).json(error);
    }
  } else {
    res.status(404).json("You can update only your account!");
  }
});

// delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(201).json("User has been deleted!");
    } catch (error) {
      res.status(403).json(error);
    }
  } else {
    res.status(404).json("You can delete only your account!");
  }
});

// get
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(201).json(others);
  } catch (error) {
    res.status(403).json(error);
  }
});

// get all
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const getAllUser = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(201).json(getAllUser);
    } catch (error) {
      res.status(403).json(error);
    }
  } else {
    res.status(404).json("You are not allowed to see users!");
  }
});

// get user stats
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.getFullYear(today.getFullYear - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
