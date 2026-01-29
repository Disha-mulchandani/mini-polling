const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const pollRoutes = require("./routes/pollRoutes");
app.use("/api/polls", pollRoutes); // ✅ This mounts pollRoutes on /api/polls

// Optional: test root
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
