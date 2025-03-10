const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const checkPermissions = require("./middlewares/permissions");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));
app.use(cookieParser());

app.use(checkPermissions);

//route get pour afficher la page de connexion/inscription
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });


//routes
app.use("/", authRoutes);

app.use(errorHandler);