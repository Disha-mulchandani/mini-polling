const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Poll routes working ✅" });
});

module.exports = router;
