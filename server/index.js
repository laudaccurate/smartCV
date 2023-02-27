const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
require("./openAI.config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Smart CV Builder",
  });
});

require("./routes")(app, upload);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
