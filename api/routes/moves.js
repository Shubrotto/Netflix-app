const router = require("express").Router();
const Movies = require("../models/Movies");
const verify = require("../routes/verifyToken");

// create
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movies(req.body);
    try {
      const movie = await newMovie.save();
      res.status(200).json(movie);
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(404).json("You are not allowed!");
  }
});

// update
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const updatedMovie = await Movies.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    try {
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(404).json("You are not allowed!");
  }
});

// delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    await Movies.findByIdAndDelete(req.params.id);
    try {
      res.status(200).json("The movie has been deleted succesfully!");
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(404).json("You are not allowed!");
  }
});

// get
router.get("/find/:id", async (req, res) => {
  const getMovie = await Movies.findById(req.params.id);
  try {
    res.status(200).json(getMovie);
  } catch (error) {
    res.status(404).json(error);
  }
});

// get random
router.get("/random", async (req, res) => {
  const type = req.query.type; // depend type it will series or movie
  let movie;
  try {
    if (type === "seires") {
      movie = await Movies.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movies.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json(error);
  }
});

// get all
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const getAllMovie = await Movies.find();
    try {
      res.status(200).json(getAllMovie.reverse());
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(404).json("You are not allowed!");
  }
});

module.exports = router;
