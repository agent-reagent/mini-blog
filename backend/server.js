const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();

const blogRoutes = require("./routes/blogRoutes");
const app = express();
const storage = multer.diskStorage({
  destination: "uploads/", // Directory to save files
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.jpg`); // Always add .jpg
  },
});

const upload = multer({ storage });
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api", blogRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
