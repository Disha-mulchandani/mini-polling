const express = require("express");
const app = express();

app.use(express.json());

const pollRoutes = require("./routes/pollRoutes");
app.use("/api/polls", pollRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
