const router = require("express").Router();
const Movies = require("../models/Movies");
const verify = require("../routes/verifyToken");

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

module.exports = router;
