const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists in your project root
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

const upload = multer({ storage });

// Application submission route
app.post("/application", upload.single("resume"), (req, res) => {
  // Access form data
  const { firstName, lastName, email, mobile, age } = req.body;
  const resumePath = req.file.path; // File path of the uploaded resume

  // Here you can save application details and resume path to your database

  return res
    .status(200)
    .json({ message: "Application submitted successfully!" });
});

const PORT = 9090; // Ensure this matches your client-side request
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
