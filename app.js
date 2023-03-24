const express = require("express");

require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Routes Middleware
app.use("/api", authRoutes);

// Routes
app.get("/", function (req, res) {
  res.send("Hello World");
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("Server is running at port:", port);
});
