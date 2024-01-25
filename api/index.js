require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
// router
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movies");
const listRouter = require("./routes/list");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB is connected!"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

app.listen(PORT, () => {
  console.log(`Server runging at http://localhost:${PORT}`);
});
