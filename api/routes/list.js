const router = require("express").Router();
const List = require("../models/List");
const verify = require("../routes/verifyToken");

// create
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const movieList = new List(req.body);
    try {
      const savedMovieList = await movieList.save();
      res.status(200).json(savedMovieList);
    } catch (error) {
      res.status(404).json(error);
    }
  }
});

// delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    await List.findByIdAndDelete(req.params.id);
    try {
      res.status(200).json("List has been deleted...");
    } catch (error) {
      res.status(404).json(error);
    }
  }
});

// get
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  let genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 4 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
