require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const createUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash, //hashPassword,
      });
      const user = await createUser.save();
      res.status(201).json(user);
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          const { password, ...other } = user._doc;

          const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.status(201).json({ ...other, accessToken });
        } else {
          res.status(403).json(err);
        }
      });
    } else {
      res.status(402).json({
        err: err,
        message: "Wrong password or username!",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
