const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const blogRoutes = require("./routes/blogRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api", blogRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((error) => console.log(error.message));
