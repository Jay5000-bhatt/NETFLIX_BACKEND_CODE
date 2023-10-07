const express = require("express");

const app = express();

app.use(express.json());

const port = 3000;

//  ---- Database Connection -----

const connect = require("./config/database");

connect.then(
  () => {
    console.log("Connected correctly to MongoDB server");
  },
  (err) => {
    console.log(err);
  }
);
//  ---- Database Connection -----

// ----- Routes -----
const userRoutes = require("./routes/user");
const ratingsRoutes = require("./routes/ratings");
const contentRoutes = require("./routes/content");
const watchHistoryRoutes = require("./routes/watchHistory");

app.use("/user", userRoutes);
app.use("/ratings", ratingsRoutes);
app.use("/content", contentRoutes);
app.use("/history", watchHistoryRoutes);

app.use("/uploads", express.static(__dirname + "/uploads"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
