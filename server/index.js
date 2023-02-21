const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Smart CV Builder",
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
