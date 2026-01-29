const express = require("express");
const cors = require("cors");
const pollRoutes = require("./routes/pollRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/polls", pollRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
